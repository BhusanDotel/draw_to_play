import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoCloud_url = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoCloud_url);
    console.log("Mongodb connected successfully!🟢");
  } catch (e) {
    console.log("DB connection error!🔴");
    console.error("Error: ", e);
    process.exit(1);
  }
};

export default connectDB;
