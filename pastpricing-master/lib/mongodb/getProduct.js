"use server";
import { connectMongodb } from "./connectMongodb";
import flipkartProduct from "./models/flipkartProduct";
import amazoneProduct from "./models/amazonProduct";

export async function getAmazonProduct(prdID) {
    await connectMongodb();
    return await JSON.parse(JSON.stringify(await amazoneProduct.findOne({ asin: prdID })));
}

export async function getFlipkartProduct(prdID) {
    await connectMongodb();
    return await JSON.parse(JSON.stringify(await flipkartProduct.findOne({ fpItmId: prdID })));
}

