// frontend/src/components/NodeStats.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function NodeStats({ stats }) {
  const [animatedStats, setAnimatedStats] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStats(stats);
    }, 200);
    return () => clearTimeout(timeout);
  }, [stats]);

  const getQueueColor = (queued, generated) => {
    const ratio = queued / generated;
    if (ratio < 0.2) return 'bg-green-500';
    if (ratio < 0.5) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getQueueStatus = (queued, generated) => {
    const ratio = queued / generated;
    if (ratio < 0.2) return 'Low';
    if (ratio < 0.5) return 'Moderate';
    return 'High';
  };

  const getStatusColor = (queued, generated) => {
    const ratio = queued / generated;
    if (ratio < 0.2) return 'text-green-600 bg-green-100';
    if (ratio < 0.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <motion.div
      className="bg-white p-6 shadow-lg rounded-3xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <Cpu size={20} /> Node Traffic Stats
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-blue-50 text-blue-800 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Node</th>
              <th className="px-4 py-3 text-center">Generated</th>
              <th className="px-4 py-3 text-center">Queued</th>
              <th className="px-4 py-3 text-left">Queue Buildup</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {animatedStats.map(({ node, generated, queued }) => {
              const percent = Math.min(Math.round((queued / generated) * 100), 100);
              const barColor = getQueueColor(queued, generated);
              const statusLabel = getQueueStatus(queued, generated);
              const statusColor = getStatusColor(queued, generated);

              return (
                <motion.tr
                  key={node}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{node}</td>
                  <td className="px-4 py-3 text-center">{generated}</td>
                  <td className="px-4 py-3 text-center">{queued}</td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full ${barColor} transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="absolute -top-7 right-0 text-xs text-gray-600 hidden group-hover:block">
                        {percent}%
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
                    >
                      {statusLabel}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
