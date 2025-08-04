// backend/index.js

const express = require("express");
const cors = require("cors");
const {
  simulateOnce,
  startSimulation,
  getCurrentState,
} = require("./simulate");

const app = express();
const PORT = 3001;

app.use(cors());

// Basic welcome route
app.get("/", (req, res) => {
  res.send("🚀 Network Traffic Simulator Backend is running!");
});

// Static one-time simulation
app.get("/simulate", (req, res) => {
  const time = req.query.time || "08:00";
  const result = simulateOnce(time);
  res.json(result);
});

// Realtime simulation stats (auto-updated every second)
app.get("/realtime", (req, res) => {
  const result = getCurrentState();
  res.json(result);
});

// Start the real-time engine
startSimulation();

app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
