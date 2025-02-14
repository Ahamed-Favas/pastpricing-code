const fs = require("fs");

const priceHistory = [
  // Generating 150 objects with continuous dates and price variance from 17999
  ...Array.from({ length: 100 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (100-index)); // Set to continuous past dates

    const variance = Math.floor(Math.random() * 100); // Random variance up to ±5000
    const price = Math.max(0, 17999 + variance); // Ensure price is not negative

    return {
      price,
      date: date.toISOString(),
    };
  }),
];
const product = {
  fpItmId: "itm1234",
  url: "https://www.flipkart.com/sample/p/itm1234",
  currency: "₹",
  image:
    "https://rukminim2.flixcart.com/image/416/416/xif0q/printer/r/y/g/smart-tank-all-in-one-520-hp-original-imah4sqcdzzwc9h2.jpeg?q=70&crop=false",
  title: "Sample prduct",
  currentPrice: 15023,
  originalPrice: 17999,
  priceHistory: priceHistory,
  discountRate: 21,
  category: "",
  reviewsCount: "406",
  stars: 4.2,
  isOutOfStock: false,
  description: "",
  createdAt: "2024-10-10T07:13:25.249Z",
  updatedAt: "2024-10-10T07:13:25.249Z",
};

fs.writeFileSync("./sample.txt", JSON.stringify(product).slice(1, -1));
