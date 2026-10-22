import dns from "node:dns";
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

    const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    const connectionInstance = await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || DB_NAME,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4,
    });

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    const message =
      error.code === "ETIMEOUT" && error.syscall === "querySrv"
        ? `${error.message}. Set MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8 or check your DNS/VPN settings.`
        : error.message.includes("tlsv1 alert internal error") ||
            error.message.includes("SSL alert number 80")
          ? `${error.message}. MongoDB Atlas rejected the TLS connection. Add this machine's public IP to Atlas Network Access and verify the username, password, and URL-encoded password in MONGODB_URI.`
          : error.message;

    console.error("MONGODB connection failed:", message);
    process.exit(1);
  }
};

export default connectDB;
