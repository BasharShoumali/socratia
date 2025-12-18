import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth routes
app.use("/api", authRoutes);

// Chat routes
app.use("/api/chat", chatRoutes);
export default app;
