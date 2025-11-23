import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
  `${process.env.MONGO_URI}/${DB_NAME}?ssl=true&authSource=admin`
);
    console.log("Database connected successfully");
    console.log("Host:", connectionInstance.connection.host);
    console.log("DB Name:", connectionInstance.connection.name);
    console.log("Port:", connectionInstance.connection.port);
    console.log("Ready State:", connectionInstance.connection.readyState);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;