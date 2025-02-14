export interface PriceHistory {
  price: number;
  date: Date;
}

export interface AmazonProduct {
  asin: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistory[];
  discountRate?: number;
  category?: string;
  reviewsCount?: string;
  stars?: number;
  isOutOfStock?: boolean;
  description?: string;
  lowestPrice?: number;
  highestPrice?: number;
  averagePrice?: number;
  createdAt: Date;
  updatedAt: Date;
  visitCount?: Number;
  lastPriceUpdatedAt?: Date;
}

export interface FlipkartProduct {
  fpItmId: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistory[];
  discountRate?: number;
  category?: string;
  reviewsCount?: string;
  stars?: number;
  isOutOfStock?: boolean;
  description?: string;
  lowestPrice?: number;
  highestPrice?: number;
  averagePrice?: number;
  createdAt: Date;
  updatedAt: Date;
  visitCount?: Number;
  lastPriceUpdatedAt?: Date;
}


export type Product = FlipkartProduct | AmazonProduct
// export interface Product {
//   amazonProduct?: AmazonProduct;
//   flipkartProduct?: FlipkartProduct;
// }

export interface queryState {
    errors?: string[] | null;
    message?: string | null;
}