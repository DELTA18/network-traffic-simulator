// frontend/src/components/LinkStats.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export default function LinkStats({ stats }) {
  const [animatedStats, setAnimatedStats] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStats(stats);
    }, 200);
    return () => clearTimeout(timeout);
  }, [stats]);

  const getUsageColor = (percentage) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getStatusLabel = (percentage) => {
    if (percentage < 50) return 'Healthy';
    if (percentage < 80) return 'Warning';
    return 'Overloaded';
  };

  const getStatusColor = (percentage) => {
    if (percentage < 50) return 'text-green-600 bg-green-100';
    if (percentage < 80) return 'text-yellow-600 bg-yellow-100';
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
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          🔗 Link Utilization Stats
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-green-50 text-green-800 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Link</th>
              <th className="px-4 py-3 text-center">Used</th>
              <th className="px-4 py-3 text-center">Capacity</th>
              <th className="px-4 py-3 text-center">Usage</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {animatedStats.map(({ link, used, capacity }) => {
              const percentage = Math.round((used / capacity) * 100);
              const barColor = getUsageColor(percentage);
              const statusLabel = getStatusLabel(percentage);
              const statusColor = getStatusColor(percentage);

              return (
                <motion.tr
                  key={link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{link}</td>
                  <td className="px-4 py-3 text-center">{used}</td>
                  <td className="px-4 py-3 text-center">{capacity}</td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full ${barColor} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="absolute -top-7 right-0 text-xs text-gray-600 hidden group-hover:block">
                        {percentage}%
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
