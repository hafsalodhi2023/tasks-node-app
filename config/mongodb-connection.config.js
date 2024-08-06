import mongoose from "mongoose";
import dotenv from "dotenv";
import debug from "debug";
dotenv.config();

const debugging = debug("development:mongodb-connection");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    debugging("The connection is successfully established with MongoDB!");
  } catch (error) {
    debugging(error + ".");
  }
};

export default connectMongoDB;
