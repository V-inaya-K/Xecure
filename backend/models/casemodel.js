// backend/models/Case.js
const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Image Analysis" },
    imageBase64: { type: String, required: true }, // store or truncate in real prod
    result: { type: Object, required: true }, // AI engine response
    status: { type: String, default: "completed" }, // could be pending/failed/etc
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", CaseSchema);
