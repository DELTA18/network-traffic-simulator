// frontend/src/App.jsx

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import NetworkGraph from "./components/NetworkGraph";
import NodeStats from "./components/NodeStats";
import LinkStats from "./components/LinkStats";
const BACKEND_URL = "http://localhost:3001"; // Change if deployed

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRealtime = () => {
      fetch(`${BACKEND_URL}/realtime`)
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error("Error fetching:", err));
    };

    fetchRealtime();
    const interval = setInterval(fetchRealtime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        ⚡ Real-Time Network Traffic Simulator
      </h1>

      {data ? (
        <>
          <p className="text-center text-sm text-gray-500 mb-6">
            Simulating time: <strong>{data.time}</strong>
          </p>
          <NetworkGraph
            links={data.linkStats}
            nodeStats={data.nodeStats}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <NodeStats stats={data.nodeStats} />
            <LinkStats stats={data.linkStats} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Node Traffic Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                📊 Node Traffic
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.nodeStats}>
                  <XAxis dataKey="node" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="generated" stroke="#2563eb" />
                  <Line type="monotone" dataKey="queued" stroke="#f97316" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Link Utilization Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-green-600">
                🔗 Link Utilization
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.linkStats}>
                  <XAxis dataKey="link" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="used" fill="#22c55e" />
                  <Bar dataKey="capacity" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-12">Waiting for data...</p>
      )}
    </div>
  );
}
