// backend/services/aiService.js
const axios = require("axios");
const { AI_ENGINE_URL } = require("../config");

// Sends base64 image to AI engine and returns the analysis result
async function analyzeImageWithAI(imageBase64) {
  const url = `${AI_ENGINE_URL}/analyze`;

  const payload = {
    image_base64: imageBase64,
  };

  const response = await axios.post(url, payload);
  return response.data; // expects JSON from FastAPI
}

module.exports = {
  analyzeImageWithAI,
};
