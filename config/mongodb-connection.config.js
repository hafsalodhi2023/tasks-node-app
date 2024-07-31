import mongoose from "mongoose";
import dotenv from "dotenv";
import debug from "debug";
dotenv.config();

const debugging = debug("development:mongodb-connection");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    debugging("Connected to MongoDB");
  } catch (error) {
    debugging(error);
  }
};

export default connectMongoDB;
