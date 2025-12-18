import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";

/* ----------------------------------------------------- */
/*  CLEAN URI                                            */
/* ----------------------------------------------------- */
const CLEAN_URI = process.env.MONGO_URI
  ? process.env.MONGO_URI.trim().replace(/;$/, "")
  : null;

/* ----------------------------------------------------- */
/*  START SERVER                                         */
/* ----------------------------------------------------- */

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!CLEAN_URI) {
      throw new Error("MONGO_URI is missing after cleaning. Cannot connect.");
    }

    console.log("🔍 Attempting DB connection...");
    await connectDB(CLEAN_URI);

    app.listen(PORT, () => {
      console.log(`🔥 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ SERVER STARTUP FAILURE");
    process.exit(1);
  }
};

start();
