// frontend/src/components/NodeStats.jsx

export default function NodeStats({ stats }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2 text-blue-600">
        🧠 Node Traffic Stats
      </h2>

      <table className="w-full text-sm border border-gray-200">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-2 border-b">Node</th>
            <th className="p-2 border-b">Generated Packets</th>
            <th className="p-2 border-b">Queued Packets</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ node, generated, queued }) => (
            <tr key={node}>
              <td className="p-2 border-b">{node}</td>
              <td className="p-2 border-b">{generated}</td>
              <td className="p-2 border-b">{queued}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
