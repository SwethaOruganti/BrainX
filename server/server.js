// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbotRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both Vite default ports
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);        // POST /auth/login
app.use("/", chatbotRoutes);         // POST /chatbot

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
