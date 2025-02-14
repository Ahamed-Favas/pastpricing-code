"use server"
import https from "https";

export async function crawlbasefetch(cleanedUrl: string) {
    try {
        const url = encodeURIComponent(cleanedUrl);
        const options = {
            hostname: "api.crawlbase.com",
            path: `/?token=${process.env.CRAWL_BASE_TOKEN}&country=${process.env.CRAWL_BASE_COUNTRY}&device=desktop&url=${url}`,
            method: "GET",
        }; 

        const fetchCrawlbaseData = ():Promise<string> =>
        new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
            let body = "";

            response.on("data", (chunk) => {
                body += chunk;
            });

            response.on("end", () => {
                resolve(body);
            });

            response.on("error", (err) => {
                reject(err);
            });
            });

            request.on("error", (err) => {
            reject(err);
            });

            request.end();
        });

        const crawlbaseResponse = await fetchCrawlbaseData();

        if (!crawlbaseResponse || crawlbaseResponse.length <= 500) {
        // change length check to a byte size
        throw new Error("Partial or empty response from Crawlbase");
        }
        return crawlbaseResponse
    }
    catch (error) {
        console.error(error)
    };
}