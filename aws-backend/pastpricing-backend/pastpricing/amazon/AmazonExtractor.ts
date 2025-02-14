import * as cheerio from 'cheerio';
import { extractDescription, extractPrice } from './amazonUtils';


export default async function extractAmazonData(response_data: any, searchPrompt: any, ASIN: any) {
    try {
        const $ = cheerio.load(response_data);

        const title = $('#productTitle').text().trim();

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole').first(),
            $('.a.size.base.a-color-price').first(),
            $('.a-button-selected .a-color-base').first(),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice').first(),
            $('.a-price.a-text-price span.a-offscreen').first(),
            $('#listPrice').first(),
            $('#priceblock_dealprice').first(),
            $('.a-size-base.a-color-price').first(),
        );

        const reviewCount = $('#acrCustomerReviewText').first().text().trim();

        // const rating =  $('#acrPopover').find('.a-size-base// a-color-base').first().text().trim()
        const rating = $('#averageCustomerReviews .a-size-base.a-color-base').first().text().trim();

        const asin = ASIN;

        const category = $('#showing-breadcrumbs_div li:last-child').first().text().trim();

        const outOfStock = $('#availability span').first().text().trim().toLowerCase() === 'currently unavailable';

        const images =
            $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}';

        const imageUrls = Object.keys(JSON.parse(images));

        const discountRate = $('.savingsPercentage').first().text().replace(/[-%]/g, '');

        const description = extractDescription($);

        const prdData: any = {
            store: 'amazon',
            asin: asin,
            url: searchPrompt,
            currency: '₹',
            image: imageUrls[0],
            title:title,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            discountRate: Number(discountRate) || 0,
            category: category || '',
            reviewsCount: reviewCount || 0,
            stars: rating || 0,
            isOutOfStock: outOfStock,
            description: description || '',
            lastPriceUpdatedAt: new Date()
        };
        // console.log(prdData);
        return prdData;
    } catch (error) {
        console.error(error);
    }
}
