"use server";
import { checkExisting } from "@/lib/mongodb/checkExisting";
import { scrapeAndStoreProduct } from "@/lib/scraper";
import { AmazonProduct, FlipkartProduct, Product } from "@/types/productObject";
import { z } from "zod";
import axios from "axios";
import { redirect } from 'next/navigation'

interface parsedAmazonProduct {
  store: "amazon";
  cleanedUrl: string;
  ASIN: string;
}
interface pasredFlipkartProduct {
  store: "flipkart";
  cleanedUrl: string;
  fpItmId: string;
}
type ParsedProductUrl = parsedAmazonProduct | pasredFlipkartProduct | false;

const cleanUrl = (url: URL): string => {
  const fullPath = url.origin + url.pathname;
  return fullPath.endsWith("/")
    ? fullPath.slice(0, -1).replace(/\/ref=.*$/, "")
    : fullPath.replace(/\/ref=.*$/, "");
};

const formSchema = z.string().url();

const validateQuery = async (value: string): Promise<ParsedProductUrl> => {
  try {
    const parsedUrl = new URL(value);
    const hostName = parsedUrl.hostname;
    const cleanedUrl = cleanUrl(parsedUrl);

    if (hostName.includes("amzn.in")) {
      const response = await axios.get(cleanedUrl, { maxRedirects: 5 });
      const nextUrl = response.request.res.responseUrl;
      const parsedUrl = new URL(nextUrl);
      const directedUrl = cleanUrl(parsedUrl);
      const amazonAsin = require("amazon-asin");
      const grabAsin = amazonAsin.syncParseAsin(directedUrl);
      const ASIN = grabAsin?.ASIN;
      if (!ASIN) {
        return false;
      }
      return {
        store: "amazon",
        cleanedUrl: directedUrl,
        ASIN: ASIN,
      };
    }


    if (hostName.includes("amazon.in")) {
      const amazonAsin = require("amazon-asin");
      const grabAsin = await amazonAsin.asyncParseAsin(cleanedUrl);
      const ASIN = grabAsin?.ASIN;
      if (!ASIN) {
        return false;
      }
      return {
        store: "amazon",
        cleanedUrl: cleanedUrl,
        ASIN: ASIN,
      };
    }

    if (hostName.includes("flipkart.com")) {
      if(cleanedUrl.includes("/s/")) {
        const response = await axios.get(cleanedUrl, { maxRedirects: 5 });
        const nextUrl = response.request.res.responseUrl;
        const parsedUrl = new URL(nextUrl);
        const directedUrl = cleanUrl(parsedUrl);
        const fpItmId = directedUrl.split("/p/")[1];
        if (!fpItmId || !(fpItmId.includes("itm"))) {
          return false;
        }
        return {
          store: "flipkart",
          cleanedUrl: directedUrl,
          fpItmId: fpItmId,
        };
      }
      const fpItmId = cleanedUrl.split("/p/")[1];
      if (!fpItmId || !(fpItmId.includes("itm"))) {
        return false;
      }
      return {
        store: "flipkart",
        cleanedUrl: cleanedUrl,
        fpItmId: fpItmId,
      };
    }

    return false;
  } catch (error) {
    return false;
  }
};


export const getProduct = async (userQuery: FormDataEntryValue | null) => {
  const checkQuery = formSchema.safeParse(userQuery);
  if (!checkQuery.success) {
    return {
      errors: checkQuery.error.flatten().fieldErrors,
      message: "Please enter a valid product url",
      className: "toast-error",
    };
  }
  const validatedData = await validateQuery(String(userQuery));
  if (!validatedData) {
    return {
      errors: "failed query validation",
      message: "Please enter a valid product url",
      className: "toast-error",
    };
  }

  const store = validatedData["store"];
  const cleanedUrl = validatedData["cleanedUrl"];

  //AMAZON

  if (store == "amazon") {
    const ASIN = validatedData["ASIN"];
    const existingPrd: AmazonProduct | null = await checkExisting(store, ASIN);
    const lastUpdated = String(existingPrd?.lastPriceUpdatedAt);

    if (!existingPrd) {
      await scrapeAndStoreProduct({
        store,
        prdId: ASIN,
        cleanedUrl,
        lastUpdated: 'invalid',
        status: "new",
      });

      return {
        errors: "product is not yet ready",
        message: "The requested page is currently unavailable. Please check back later.",
        className: "toast-success",
      };
    }

    if(existingPrd.priceHistory.length < 2){
        await scrapeAndStoreProduct({
        store,
        prdId: ASIN,
        cleanedUrl,
        lastUpdated,
        status: "existing"
      });
      return {
        errors: "product is not yet ready",
        message: "The requested page is currently unavailable. Please check back later.",
        className: "toast-success",
      };
    }

    await scrapeAndStoreProduct({
      store,
      prdId: ASIN,
      cleanedUrl,
      lastUpdated,
      status: "existing"
    });
    redirect(`/product/amazon/${ASIN}`)

  }

  //FLIPKART

  if (store == "flipkart") {
    const fpItmId = validatedData["fpItmId"];
    const existingPrd: FlipkartProduct | null = await checkExisting(store, fpItmId);
    const lastUpdated = String(existingPrd?.lastPriceUpdatedAt);

    if (!existingPrd) {
      await scrapeAndStoreProduct({
        store,
        prdId: fpItmId,
        cleanedUrl,
        lastUpdated: 'invalid',
        status: "new"
      });
      return {
        errors: "product is not yet ready",
        message: "The requested page is currently unavailable. Please check back later.",
        className: "toast-success",
      };
    }

    if(existingPrd.priceHistory.length < 2){
        await scrapeAndStoreProduct({
        store,
        prdId: fpItmId,
        cleanedUrl,
        lastUpdated,
        status: "existing"
      });
      return {
        errors: "product is not yet ready",
        message: "The requested page is currently unavailable. Please check back later.",
        className: "toast-success",
      };
    }

    await scrapeAndStoreProduct({
      store,
      prdId: fpItmId,
      cleanedUrl,
      lastUpdated,
      status: "existing"
    });
    redirect(`/product/flipkart/${fpItmId}`)
  }
}
