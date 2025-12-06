// backend/config.js
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fraud_detection";

const AI_ENGINE_URL =
  process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  AI_ENGINE_URL,
};
