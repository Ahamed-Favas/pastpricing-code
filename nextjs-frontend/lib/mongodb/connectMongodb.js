import mongoose from "mongoose";
let connectionStatus = false;
export const connectMongodb = async() => {
    try {
         if (!connectionStatus){
            mongoose.set("strictQuery", true);
            await mongoose.connect(process.env.MONGODB_URI);
            connectionStatus = true;
            // console.log("MongoDB db connected")
         }
        }
    catch (error) {
        console.log(error)
    }
}
