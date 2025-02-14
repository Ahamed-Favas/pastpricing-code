"use server";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

interface amazonScraper {
  cleanedUrl: string;
  ASIN: string;
  lastUpdated: string;
  status: string;
}

const aws_access_key =  process.env.AWS_ACCESS_KEY_ID;
const aws_secret_key = process.env.AWS_SECRET_KEY_ID;
const sqs_queue_url = process.env.SQS_URL;
const sqs_region =  process.env.SQS_REGION;

//@ts-expect-error: maybe sdk's bug
const client = new SQSClient({
  region: sqs_region,
  credentials: {
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_key,
  },
});

const sendSQS = async(cleanedUrl: string, ASIN: string) => {
  console.log(`sqs send for url ${cleanedUrl}`)
  try {
      const command = new SendMessageCommand({QueueUrl: sqs_queue_url,
      MessageDeduplicationId: cleanedUrl,
      MessageAttributes: {
        CleanedUrl: {
          DataType: "String",
          StringValue: cleanedUrl,
        },
        ItmId: {
          DataType: "String",
          StringValue: ASIN,
        }
      },
      MessageBody:
        "amazon",
        MessageGroupId: "Amazon",
      });

    await client.send(command);
    return null;
    
    } catch (error) {
      console.error(error);
      return null;
    }
}

export const amazonScraper = async ({cleanedUrl, ASIN, lastUpdated, status}: amazonScraper): Promise<null> => {
    if (!ASIN) return null;
    if(status === "existing") {
      const currentTime = new Date();
      const lastUpdateTime = new Date(lastUpdated);
      const hrIntervalInMs = Number(process.env.AMAZON_SCRAPE_HRS_INTERVEL) * 3600000;
      // checking wether data is upto date
      if (currentTime.getTime() - lastUpdateTime.getTime() > hrIntervalInMs) {
        // data is depreciated
        await sendSQS(cleanedUrl, ASIN);
      }
      // data is not depreciated
      return null;
    }
    else if(status === "new") {
      await sendSQS(cleanedUrl, ASIN);
    }
    return null;
};
