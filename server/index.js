import { connectDB } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

console.log("📌 index.js loaded");

const PORT = 5000;

const start = async () => {
  console.log("📌 start() function triggered");

  try {
    await connectDB();
    console.log("📌 DB connected, starting server...");

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
