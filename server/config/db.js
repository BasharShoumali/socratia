import mongoose from "mongoose";

console.log("📌 db.js loaded");

export const connectDB = async () => {
  console.log("📌 connectDB() called");

  console.log("📌 MONGO_URI =", JSON.stringify(process.env.MONGO_URI));

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("☁️ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    throw error;
  }
};
