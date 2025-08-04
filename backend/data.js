// backend/data.js

const trafficRates = {
  "08:00": { A: 50, B: 30, C: 40, D: 20, E: 60 },
  "08:15": { A: 55, B: 35, C: 45, D: 25, E: 65 },
  "08:30": { A: 60, B: 40, C: 50, D: 30, E: 70 },
  "08:45": { A: 55, B: 35, C: 45, D: 25, E: 65 },
};

const links = [
  { from: "A", to: "B", capacity: 100 },
  { from: "A", to: "C", capacity: 80 },
  { from: "B", to: "D", capacity: 70 },
  { from: "C", to: "D", capacity: 90 },
  { from: "C", to: "E", capacity: 100 },
  { from: "D", to: "E", capacity: 60 },
];

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
