import mongoose from "mongoose";

const { Schema, models } = mongoose;

const flipkartProductSchema = new Schema(
  {
    store: { type: String, required: true },
    fpItmId: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    discountRate: { type: Number },
    category: { type: String },
    reviewsCount: { type: String },
    stars: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    description: { type: String },
    visitCount: { type: Number, default: 0, required: true},
    lastPriceUpdatedAt: { type: Date, required: true}
  },
  { timestamps: true }
);
// mongoose.deleteModel("flipkartProduct")
const flipkartProduct =
  models.flipkartProduct ||
  mongoose.model("flipkartProduct", flipkartProductSchema);
export default flipkartProduct;
