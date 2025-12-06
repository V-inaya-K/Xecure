// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config");
const caseRoutes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // allow base64 images

// Routes
app.use("/api/cases", caseRoutes);

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});
