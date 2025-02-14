import axios from "axios";

function encodeHeaders(headers: {}) {
  return Object.entries(headers)
    .map(([key, value]:[any, any]) => `${encodeURIComponent(key)}%3A${encodeURIComponent(value)}`)
    .join('%7C');
}

async function crawlbasefetch(requestedUrl: string, requestedStore: string) {
    try {
        let headers = {}
        switch(requestedStore) {
            case "amazon":
                headers = {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'en-US,en;q=0.9',
                    'cache-control': 'max-age=0',
                    'device-memory': '8',
                    'downlink': '1.4',
                    'dpr': '1',
                    'ect': '3g',
                    'priority': 'u=0, i',
                    'rtt': '400',
                    'sec-ch-device-memory': '8',
                    'sec-ch-dpr': '1',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Linux"',
                    'sec-ch-ua-platform-version': '"6.5.0"',
                    'sec-ch-viewport-width': '1920',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'viewport-width': '1920',
                }
                break;
            case "flipkart":
                headers = {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-arch': '"x86"',
                    'sec-ch-ua-full-version': '"131.0.6778.204"',
                    'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.204", "Chromium";v="131.0.6778.204", "Not_A Brand";v="24.0.0.0"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Linux"',
                    'sec-ch-ua-platform-version': '"6.5.0"',
                }
                break;
        }
 
        const fetchCrawlbaseData = async() => {
            const url = encodeURIComponent(requestedUrl);
            const encodedHeader = encodeHeaders(headers)
            const response = await axios.get(`${process.env.crawlbaseUrl}&country=IN&device=desktop&url=${url}&request_headers=${encodedHeader}`);
            return response
        }

        const crawlbaseResponse = await fetchCrawlbaseData();

        if (String(crawlbaseResponse.data).length < 500) {
        // change length check to a byte size
            throw new Error("Partial or empty response from Crawlbase");
        }
        return crawlbaseResponse.data
    }
    catch (error) {
        console.error(error)
    };
}
export default crawlbasefetch