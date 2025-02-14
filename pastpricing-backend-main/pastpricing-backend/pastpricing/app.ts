import { SQSEvent } from 'aws-lambda'
import crawlbasefetch  from './scraper/crawlbase';
import mongoose from 'mongoose';
import connectMongodb from './mongodb/connect';
import mailer from './alert/mailer';
import extractAmazonData from './amazon/AmazonExtractor';
import amazoneProduct from './mongodb/models/amazonProduct';
import extractFlipkartData from './flipkart/FlipkartExtractor';
import flipkartProduct from './mongodb/models/flipkartProduct';


export const lambdaHandler = async (event: SQSEvent) => {
    if (!process.env.CRAWL_BASE_TOKEN || !process.env.CRAWL_BASE_COUNTRY || !process.env.MONGODB_URI || !process.env.GMAIL_SECRET_KEY || !process.env.GMAIL_USER) {
         console.error("Missing required environment variables");
         throw new Error("Missing required environment variables");
     }

    try {
      await Promise.all(event.Records.map(processMessageAsync));
      console.info("All messages processed");
    } catch (err) {
       console.error('Error processing messages', err);
      throw err;
    }
};

  async function processMessageAsync(message: any) {

    const requested_url = message.messageAttributes.CleanedUrl.stringValue;
    const requested_store = message.body;
    const requested_prdID = message.messageAttributes.ItmId.stringValue;

    console.log(`received request : ${requested_url}, ${requested_store}, ${requested_prdID}`)

    if (!requested_url || !requested_store || !requested_prdID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "missing request parameters" }),
      };
    }

    const response =  await crawlbasefetch(requested_url, requested_store)

    if(requested_store === "amazon")
    {
      const prdData = await extractAmazonData(response, requested_url, requested_prdID);
      const currentPrice = prdData?.currentPrice;

      if(!currentPrice) {
        await mailer(requested_url);
        console.log("missing price information");
        return {
          statusCode: 502,
          body: JSON.stringify({ error: "missing price information" }),
        };
      }
      
      const updatedPrd: any = {}
      for(const key in prdData) {
        if(prdData[key] !== undefined || prdData[key] !== null)
        {
          updatedPrd[key] = prdData[key];
        }
      }

      try {
        if (!mongoose.connection.readyState) {
          await connectMongodb();
        }
          await amazoneProduct.findOneAndUpdate(
          { asin: updatedPrd.asin },
          { $set: updatedPrd,
            $push: { priceHistory: { price: currentPrice, date: new Date()} } 
           },
          { upsert: true }
        );
      }
      catch(err) {
        console.log(err)
      }
    }

    if(requested_store === "flipkart")
    {
      const prdData = await extractFlipkartData(response, requested_url, requested_prdID);
      const currentPrice = prdData?.currentPrice;

      if(!currentPrice) {
        await mailer(requested_url);
        console.log("missing price information");
        return {
          statusCode: 502,
          body: JSON.stringify({ error: "missing price information" }),
        };
      }
      
      const updatedPrd: any = {}
      for(const key in prdData) {
        if(prdData[key] !== undefined || prdData[key] !== null)
        {
          updatedPrd[key] = prdData[key];
        }
      }

      try {
        if (!mongoose.connection.readyState) {
          await connectMongodb();
        }
          await flipkartProduct.findOneAndUpdate(
          { fpItmId: updatedPrd.fpItmId },
          { $set: updatedPrd,
            $push: { priceHistory: { price: currentPrice, date: new Date()} } 
           },
          { upsert: true }
        );
      }
      catch(err) {
        console.log(err)
      }

    }

    return
}
