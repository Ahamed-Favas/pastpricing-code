import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDescription,
  extractPrice,
} from "./testamazonUtils.mjs";
import * as fs from "fs";
export default async function extractAmazonData(response_data, searchPrompt, ASIN) {
  try {
    const $ = cheerio.load(response_data);

    const title = $("#productTitle").text().trim();

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole").first(),
      $(".a.size.base.a-color-price").first(),
      $(".a-button-selected .a-color-base").first()
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice").first(),
      $(".a-price.a-text-price span.a-offscreen").first(),
      $("#listPrice").first(),
      $("#priceblock_dealprice").first(),
      $(".a-size-base.a-color-price").first()
    );

    const reviewCount = $("#acrCustomerReviewText").first().text().trim();

    // const rating =  $('#acrPopover').find('.a-size-base// a-color-base').first().text().trim()
    const rating = $("#averageCustomerReviews .a-size-base.a-color-base").first()
      .text()
      .trim();

    const asin = ASIN;

    const category = $("#showing-breadcrumbs_div li:last-child").first().text().trim();

    const outOfStock =
      $("#availability span").first().text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const discountRate = $(".savingsPercentage").first().text().replace(/[-%]/g, "");

    const description = extractDescription($);

    const prdData = {
      asin: asin,
      url: searchPrompt,
      currency: "₹",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      // priceHistory: [{price: Number(currentPrice)}],
      discountRate: Number(discountRate) || 0,
      category: category || '',
      reviewsCount: reviewCount || 0,
      stars: rating || 0,
      isOutOfStock: outOfStock,
      description: description || '',
      // lowestPrice: Number(currentPrice) || Number(originalPrice),
      // highestPrice: Number(originalPrice) || Number(currentPrice),
      // averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    // console.log(prdData);
    return prdData;
  } catch (error) {
    console.log(error);
  }
}

const data = fs.readFileSync("crawlbase.html", "utf-8");
extractAmazonData(
  data,
  "https://www.amazon.in/Symbol-Solid-Regular-AW19MCPO_Jet-Black_XL/dp/B07SH5WXN4/ref=sr_1_5?%2Fi=fashion&rps=1&s=apparel&sr=1-5",
  "B07SH5WXN4"
);