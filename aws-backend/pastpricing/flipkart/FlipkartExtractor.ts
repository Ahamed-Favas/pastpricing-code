import * as cheerio from "cheerio";
import { extractPrice, increaseRes } from "./flipkartUtils";
export default async function extractFlipkartData(
  responseData: any,
  searchPrompt: any,
  fpItmId: any
) {
  try {
    //TODO add selectors for flipkart description
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
    let image: string = ''
    $("img._0DkuPH").each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl) {
        imageUrls.push(imageUrl);
        image = increaseRes(imageUrls[0]);
      }
    });
    

    const discountRate = extractPrice($(".UkUFwK.WW8yVX > span").first());

    const prdData: any = {
      store: "flipkart",
      fpItmId: fpItmId,
      url: searchPrompt,
      currency: "₹",
      image: image,
      title: title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      discountRate: Number(discountRate) || 0,
      category: "",
      reviewsCount: reviewCount || 0,
      stars: rating || 0,
      isOutOfStock: outOfStock,
      description: "",
      lastPriceUpdatedAt: new Date()
    };
    // console.log(prdData);
    return prdData;
  } catch (error) {
    console.log(error);
  }
}
