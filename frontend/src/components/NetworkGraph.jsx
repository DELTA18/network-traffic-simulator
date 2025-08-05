// frontend/src/components/NetworkGraph.jsx

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function NetworkGraph({ links, nodeStats }) {
  const positions = {
    A: { x: 0, y: 0 },
    B: { x: 300, y: 0 },
    C: { x: 0, y: 300 },
    D: { x: 300, y: 300 },
    E: { x: 150, y: 150 },
    F: { x: 450, y: 150 },
    G: { x: 150, y: 450 },
  };

  const getColor = (used, capacity) => {
    const load = used / capacity;
    if (load < 0.5) return "green";
    if (load < 0.8) return "orange";
    return "red";
  };

  const nodes = Object.entries(positions).map(([id, pos]) => {
    const stats = nodeStats?.find((n) => n.node === id);
    const label = stats
      ? `${id}\nGen: ${stats.generated}\nQueue: ${stats.queued}`
      : id;

    return {
      id,
      data: { label: <div className="whitespace-pre">{label}</div> },
      position: pos,
      style: {
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 6,
        background: "#eef",
        width: 100,
        textAlign: "center",
        fontSize: 12,
      },
    };
  });

  const edges = links.map(({ link, used, capacity }) => {
    const [source, target] = link.split("-");
    return {
      id: link,
      source,
      target,
      animated: true,
      style: { stroke: getColor(used, capacity), strokeWidth: 2 },
      label: `${used}/${capacity}`,
      labelStyle: { fontSize: 10 },
    };
  });

  return (
    <div className="bg-white p-4 rounded shadow mt-6" style={{ height: 400 }}>
      <h2 className="text-lg font-semibold mb-2 text-purple-600">
        🌐 Network Topology (Interactive)
      </h2>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        panOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
