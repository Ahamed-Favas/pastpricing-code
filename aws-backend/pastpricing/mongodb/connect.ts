import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    mongoose.set("strictQuery", true);
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("MongoDB db connected")
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;
