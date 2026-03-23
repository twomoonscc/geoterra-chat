export default function DataCard({ card }) {
  if (card.type === "stats") {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3.5 shadow-sm">
        <div className="flex gap-6">
          {card.stats.map((stat, i) => (
            <div key={i} className="flex flex-col min-w-0">
              <span className="text-2xl font-semibold text-zinc-50 tabular-nums leading-none">
                {stat.value}
              </span>
              <span className="text-xs text-zinc-500 mt-1.5 leading-none">
                {stat.label}
              </span>
              {stat.trend && (
                <span
                  className={`text-xs mt-1 font-medium ${
                    stat.trend.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.type === "table") {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm">
        <table className="w-full text-xs" role="table">
          <thead>
            <tr className="border-b border-zinc-800">
              {card.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-zinc-500 font-medium bg-zinc-800/60 first:pl-3"
                  scope="col"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 text-zinc-300 ${
                      j > 0 ? "font-mono text-zinc-400" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
