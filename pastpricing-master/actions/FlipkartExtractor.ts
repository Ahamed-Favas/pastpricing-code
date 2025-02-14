import * as cheerio from "cheerio";
import { extractPrice, increaseRes } from "@/actions/utils/flipkartUtils";
export default async function extractFlipkartData(
  responseData: any,
  searchPrompt: any,
  fpItmId: any
) {
  try {
    // console.log(responseData);
    const $ = cheerio.load(responseData);

    const title = $(".VU-ZEz").text().trim();

    const currentPrice = extractPrice($(".Nx9bqj").first());

    const originalPrice = extractPrice($(".yRaY8j").first());

    const rating = $("._5OesEi.HDvrBb .XQDdHH").first().text().trim();

    const ratingText = $("span.Wphh3N span").first().text().trim();
    const [, reviewCount] = ratingText.match(/\d+(?:,\d+)?/g) || [];

    const outOfStock =
      $("Z8JjpR").first().text().trim().toLocaleLowerCase() === "coming soon";

    const imageUrls: any[] = [];
    $("img._0DkuPH").each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });
    const image = increaseRes(imageUrls[0]);

    const discountRate = extractPrice($(".UkUFwK.WW8yVX > span").first());

    const prdData = {
      store: "flipkart",
      fpItmId,
      url: searchPrompt,
      currency: "₹",
      image,
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [{price: currentPrice, date: new Date()}],
      discountRate: Number(discountRate) || 0,
      category: "",
      reviewsCount: reviewCount || 0,
      stars: rating || 0,
      isOutOfStock: outOfStock,
      description: "",
      // lowestPrice: Number(currentPrice) || Number(originalPrice),
      // highestPrice: Number(originalPrice) || Number(currentPrice),
      // averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    // console.log(prdData);
    return prdData;
    // console.log( originalPrice
  } catch (error) {
    console.log(error);
  }
}
