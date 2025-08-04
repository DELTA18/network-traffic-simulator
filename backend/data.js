// backend/data.js

const trafficRates = {
  "08:00": { A: 50, B: 30, C: 40, D: 20, E: 60, F: 45, G: 35 },
  "08:15": { A: 55, B: 35, C: 45, D: 25, E: 65, F: 50, G: 40 },
  "08:30": { A: 60, B: 40, C: 50, D: 30, E: 70, F: 60, G: 50 },
  "08:45": { A: 55, B: 35, C: 45, D: 25, E: 65, F: 55, G: 45 },
  "09:00": { A: 70, B: 50, C: 60, D: 40, E: 80, F: 65, G: 55 },
  "09:15": { A: 75, B: 60, C: 65, D: 50, E: 85, F: 70, G: 60 },
  "09:30": { A: 80, B: 55, C: 70, D: 45, E: 90, F: 75, G: 65 },
};


const links = [
  { from: "A", to: "B", capacity: 100 },
  { from: "A", to: "C", capacity: 80 },
  { from: "B", to: "D", capacity: 70 },
  { from: "C", to: "D", capacity: 90 },
  { from: "C", to: "E", capacity: 100 },
  { from: "D", to: "E", capacity: 60 },
  { from: "E", to: "F", capacity: 75 },
  { from: "F", to: "G", capacity: 85 },
  { from: "B", to: "F", capacity: 60 },
  { from: "A", to: "G", capacity: 50 },
  { from: "G", to: "D", capacity: 70 },
];

const positions = {
  A: { x: 0, y: 100 },
  B: { x: 150, y: 0 },
  C: { x: 150, y: 200 },
  D: { x: 300, y: 100 },
  E: { x: 450, y: 100 },
  F: { x: 600, y: 50 },
  G: { x: 600, y: 150 },
};
// Create adjacency list for graph
const buildGraph = () => {
  const graph = {};
  links.forEach(({ from, to, capacity }) => {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    graph[from].push({ node: to, capacity });
    graph[to].push({ node: from, capacity }); // Bidirectional
  });
  return graph;
};

const graph = buildGraph();

module.exports = { trafficRates, links, graph };
