import { connectDB } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
