import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in the environment");
    }

    if (
      !mongoUri.startsWith("mongodb://") &&
      !mongoUri.startsWith("mongodb+srv://")
    ) {
      throw new Error(
        "MONGODB_URI must start with mongodb:// or mongodb+srv://"
      );
    }

    const connectionInstance = await mongoose.connect(mongoUri, {
      dbName: DB_NAME,
    });

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.error("MONGODB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
