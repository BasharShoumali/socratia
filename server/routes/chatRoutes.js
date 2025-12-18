// routes/chatRoutes.js
import express from "express";
import {
  startChat,
  appendMessage,
  getUserChats,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/start", startChat);
router.post("/append", appendMessage);
router.get("/:username", getUserChats);

export default router;
