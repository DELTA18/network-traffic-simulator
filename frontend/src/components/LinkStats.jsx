// frontend/src/components/LinkStats.jsx

export default function LinkStats({ stats }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2 text-green-600">
        🔗 Link Utilization Stats
      </h2>

      <table className="w-full text-sm border border-gray-200">
        <thead className="bg-green-100 text-left">
          <tr>
            <th className="p-2 border-b">Link</th>
            <th className="p-2 border-b">Used</th>
            <th className="p-2 border-b">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ link, used, capacity }) => (
            <tr key={link}>
              <td className="p-2 border-b">{link}</td>
              <td className="p-2 border-b">{used}</td>
              <td className="p-2 border-b">{capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
