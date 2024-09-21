import mongoose from "mongoose";

const mongoCloud_url = "mongodb://localhost:27017/DrawIO";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoCloud_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected successfully!🟢");
  } catch (e) {
    console.log("DB connection error!🔴");
    console.error("Error: ", e);
    process.exit(1);
  }
};

export default connectDB;
