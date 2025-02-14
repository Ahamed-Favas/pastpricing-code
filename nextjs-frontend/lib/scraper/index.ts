"use server";
import { Product } from "@/types/productObject";
import { amazonScraper } from "./amazonScraper";
import { flipkartScraper } from "./flipkartScraper";

interface scrapeAndStoreProduct {
  store: string;
  prdId: string;
  cleanedUrl: string;
  lastUpdated: string;
  status: string;
}

export async function scrapeAndStoreProduct({
  store,
  prdId,
  cleanedUrl,
  lastUpdated,
  status,
}: scrapeAndStoreProduct): Promise<Product | null> {
  if (!cleanedUrl) {
    return null;
  }

  // AMAZON

  if (store === "amazon") {
    return amazonScraper({ cleanedUrl, ASIN: prdId, lastUpdated, status });
  }

  // FLIPKART
  
  if (store === "flipkart") {
    return flipkartScraper({ cleanedUrl, fpItmId: prdId, lastUpdated, status });
  }
  return null;
}
