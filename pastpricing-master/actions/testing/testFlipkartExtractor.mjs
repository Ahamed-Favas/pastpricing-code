import * as cheerio from 'cheerio';
import { extractPrice, increaseRes } from './testflipkartUtils.mjs';
import * as fs from "fs";
export default async function extractFlipkartData(responseData, searchPrompt, fpItmId) {
try {
    // console.log(responseData);
    const $ = cheerio.load(responseData);
    const title = $(".VU-ZEz").text().trim();
    const currentPrice = extractPrice($(".Nx9bqj").first());
    const originalPrice = extractPrice($(".yRaY8j").first());
    // const contents = extractPrice($(".yRaY8j"))
    //   .contents()
    //   .filter(function () {
    //     return this.type === "text"; // Filter out only text nodes
    //   });

    // Concatenate the 0th and 1st text node values
    // const originalPrice = contents[0]?.data.trim() + contents[1]?.data.trim();

    // console.log(currentPrice);
    const rating = $("._5OesEi.HDvrBb .XQDdHH").first().text().trim();

    // Extract review and rating counts
    const ratingText = $("span.Wphh3N span").first().text().trim();
    const [ ,reviewCount] = ratingText.match(/\d+(?:,\d+)?/g) || [];

    const category = "";

    const outOfStock =
      $("Z8JjpR").first().text().trim().toLocaleLowerCase() === "coming soon";

    const imageUrls = [];
    $("img._0DkuPH").each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });

    const image = increaseRes(imageUrls[0])

    const discountRate = extractPrice($(".UkUFwK.WW8yVX > span").first());

    const description = "";

    const prdData = {
      fpItmId,
      url: searchPrompt,
      currency: "₹",
      image,
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      // priceHistory: [{price: Number(currentPrice)}],
      discountRate: Number(discountRate) || 0,
      category: category,
      reviewsCount: reviewCount || 0,
      stars: rating || 0,
      isOutOfStock: outOfStock,
      description,
      // lowestPrice: Number(currentPrice) || Number(originalPrice),
      // highestPrice: Number(originalPrice) || Number(currentPrice),
      // averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    console.log(prdData);
    return prdData;
    // console.log( originalPrice
  } catch (error) {
    console.log(error);
  }
}
const data = fs.readFileSync("crawlbase.html", "utf-8");
const url = "https://www.flipkart.com/apple-2020-macbook-air-m1-8-gb-256-gb-ssd-mac-os-big-sur-mgn63hn-a/p/itm3c872f9e67bc6"
extractFlipkartData(data, url, 'itm3c872f9e67bc6');