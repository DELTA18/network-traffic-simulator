// backend/index.js

const express = require("express");
const cors = require("cors");
const simulateTraffic = require("./simulate");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Network Traffic Simulator Backend Running");
});

app.get("/simulate", (req, res) => {
  const time = req.query.time || "08:00";
  const result = simulateTraffic(time);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
