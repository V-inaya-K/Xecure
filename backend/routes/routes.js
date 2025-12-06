// backend/routes/caseRoutes.js
const express = require("express");
const router = express.Router();
const {
  analyzeImage,
  getCaseById,
  listCases,
} = require("../controller/controller");

router.post("/analyze", analyzeImage);
router.get("/:id", getCaseById);
router.get("/", listCases);

module.exports = router;
