"use server"
import { connectMongodb } from "./connectMongodb";
import flipkartProduct from "./models/flipkartProduct";
import amazoneProduct from "./models/amazonProduct";

export async function checkExisting(store, prdID) {
    if (store == "amazon")
        { await connectMongodb();
            return await JSON.parse(JSON.stringify(await amazoneProduct.findOneAndUpdate({ asin: prdID }, { $inc: { visitCount: 1 } }, { returnDocument: 'after' } )));
        }
    if (store == "flipkart") {
        await connectMongodb();
        return await JSON.parse(JSON.stringify(await flipkartProduct.findOneAndUpdate({ fpItmId: prdID }, { $inc: { visitCount: 1 } }, { returnDocument: 'after' } )));
    }
    return null
}