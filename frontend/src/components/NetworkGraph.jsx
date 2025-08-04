// frontend/src/components/NetworkGraph.jsx

export default function NetworkGraph({ links, nodeStats }) {
  const getColor = (used, capacity) => {
    const load = used / capacity;
    if (load < 0.5) return "#4ade80"; // green
    if (load < 0.8) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  const positions = {
    A: { x: 20, y: 20 },
    B: { x: 80, y: 20 },
    C: { x: 20, y: 80 },
    D: { x: 80, y: 80 },
    E: { x: 50, y: 50 },
  };

  return (
    <div className="bg-white p-4 shadow rounded mt-8 w-full">
      <h2 className="text-lg font-semibold mb-4 text-purple-600">
        🌐 Visual Network Graph
      </h2>

      <div className="w-full h-[400px] overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Links */}
          {links.map(({ link, used, capacity }) => {
            const [from, to] = link.split("-");
            const start = positions[from];
            const end = positions[to];
            const color = getColor(used, capacity);

            return (
              <line
                key={link}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={color}
                strokeWidth="2"
              />
            );
          })}

          {/* Nodes */}
          {Object.entries(positions).map(([node, { x, y }]) => (
            <g key={node}>
              <circle cx={x} cy={y} r="4" fill="#2563eb" />
              <text
                x={x}
                y={y - 6}
                textAnchor="middle"
                fontSize="4"
                fill="#000"
              >
                {node}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
