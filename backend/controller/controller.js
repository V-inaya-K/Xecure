// backend/controllers/caseController.js
const Case = require("../models/casemodel");
const { analyzeImageWithAI } = require("../services/aiservice");

// POST /api/cases/analyze
// Body: { imageBase64: "data..." }
async function analyzeImage(req, res) {
  try {
    const { imageBase64, title } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: "imageBase64 is required" });
    }

    // Call AI engine
    const aiResult = await analyzeImageWithAI(imageBase64);

    // Save case in DB
    const newCase = await Case.create({
      title: title || "Image Analysis",
      imageBase64,
      result: aiResult,
      status: "completed",
    });

    res.status(201).json({
      caseId: newCase._id,
      result: aiResult,
    });
  } catch (err) {
    console.error("analyzeImage error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET /api/cases/:id
async function getCaseById(req, res) {
  try {
    const { id } = req.params;
    const found = await Case.findById(id);

    if (!found) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(found);
  } catch (err) {
    console.error("getCaseById error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET /api/cases
async function listCases(req, res) {
  try {
    const cases = await Case.find().sort({ createdAt: -1 }).limit(50);
    res.json(cases);
  } catch (err) {
    console.error("listCases error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  analyzeImage,
  getCaseById,
  listCases,
};
