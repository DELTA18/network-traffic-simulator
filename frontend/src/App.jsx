// frontend/src/App.jsx

import { useEffect, useState } from "react";
import NodeStats from "./components/NodeStats";
import LinkStats from "./components/LinkStats";
import NetworkGraph from "./components/NetworkGraph";


const BACKEND_URL = "http://localhost:3001"; // change for Railway later

export default function App() {
  const [time, setTime] = useState("08:00");
  const [data, setData] = useState(null);

  const times = ["08:00", "08:15", "08:30", "08:45"];

  useEffect(() => {
    fetch(`${BACKEND_URL}/simulate?time=${time}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Error fetching data:", err));

      console.log(data)
  }, [time]);

  return (
    <div className="min-h-screen w-full bg-gray-50  font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📊 Network Traffic Simulator
      </h1>

      <div className="flex justify-center mb-6">
        <label className="mr-2 font-medium">Select Time:</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="px-3 py-1 border rounded shadow"
        >
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {data ? (
        <>
        <div className="grid gap-8 md:grid-cols-2">
          <NodeStats stats={data.nodeStats} />
          <LinkStats stats={data.linkStats} />
        </div>
        <NetworkGraph
            links={data.linkStats}
            nodeStats={data.nodeStats}
/>
        </>
        
      ) : (
        <p className="text-center text-gray-500">Loading simulation...</p>
      )}
    </div>
  );
}
