import express from "express";
import { getChatResponse } from "../controllers/chatbotController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Define the chatbot POST route
router.post("/chatbot", getChatResponse);

export default router;