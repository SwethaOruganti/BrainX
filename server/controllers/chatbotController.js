import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getChatResponse = async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ 
      error: "Message is required and must be a non-empty string" 
    });
  }

  try {
    // Use the latest model names (gemini-1.5-pro-latest or gemini-pro)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest", // or "gemini-pro" if you want the older version
      generationConfig: {
        temperature: 0.9,
      }
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: message }]
      }]
    });

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (err) {
    console.error("Gemini API Error:", err);
    
    res.status(500).json({ 
      error: "Failed to process your request",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};