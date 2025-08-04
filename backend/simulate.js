// backend/simulate.js

const { trafficRates, links, graph } = require("./data");

function bfsShortestPath(start, end) {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === end) return path;
    if (visited.has(node)) continue;

    visited.add(node);

    const neighbors = graph[node] || [];
    for (let neighbor of neighbors) {
      queue.push([...path, neighbor.node]);
    }
  }

  return null; // No path found
}

function simulateTraffic(time) {
  const nodes = trafficRates[time];
  if (!nodes) return { error: "Invalid time" };

  const linkUsage = {};
  const nodeQueues = {};
  const packets = [];

  // Initialize stats
  links.forEach(({ from, to }) => {
    const key = [from, to].sort().join("-");
    linkUsage[key] = { used: 0, capacity: getCapacity(from, to) };
  });

  // 1. Generate packets
  for (let [source, rate] of Object.entries(nodes)) {
    for (let i = 0; i < rate; i++) {
      // Pick random destination ≠ source
      let dest;
      do {
        dest = randomNode(Object.keys(nodes));
      } while (dest === source);

      packets.push({ source, dest });
    }
  }

  // 2. Route packets
  for (let packet of packets) {
    const path = bfsShortestPath(packet.source, packet.dest);
    if (!path) continue;

    let canTransmit = true;

    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      const key = [from, to].sort().join("-");
      const usage = linkUsage[key];

      if (usage.used + 1 > usage.capacity) {
        canTransmit = false;
        break;
      }
    }

    if (canTransmit) {
      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        const key = [from, to].sort().join("-");
        linkUsage[key].used += 1;
      }
    } else {
      nodeQueues[packet.source] = (nodeQueues[packet.source] || 0) + 1;
    }
  }

  // 3. Prepare stats
  const nodeStats = Object.keys(nodes).map((node) => ({
    node,
    generated: nodes[node],
    queued: nodeQueues[node] || 0,
  }));

  const linkStats = Object.entries(linkUsage).map(([key, usage]) => ({
    link: key,
    used: usage.used,
    capacity: usage.capacity,
  }));

  return {
    time,
    nodeStats,
    linkStats,
  };
}

// Helpers
function randomNode(nodes) {
  const index = Math.floor(Math.random() * nodes.length);
  return nodes[index];
}

function getCapacity(a, b) {
  const link = links.find(
    (l) =>
      (l.from === a && l.to === b) ||
      (l.from === b && l.to === a)
  );
  return link ? link.capacity : 0;
}

module.exports = simulateTraffic;
