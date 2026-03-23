const SUGGESTIONS = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    text: "Show population density",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 4v13M15 7v13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: "Find parcels near the river",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "Highlight flood risk zones",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "Measure distance between points",
  },
];

export default function EmptyState({ onSend }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-12 text-center">
      <div className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="9"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <path d="M3 12h18" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-zinc-50 mb-2">
        What would you like to explore?
      </h2>
      <p className="text-sm text-zinc-500 mb-7 max-w-[260px] leading-relaxed">
        Ask a question in natural language to query and visualize your
        geospatial data.
      </p>

      <div className="grid grid-cols-2 gap-2 w-full max-w-[300px]">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            onClick={() => onSend(s.text)}
            className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-left hover:border-blue-500/40 hover:bg-zinc-800 hover:-translate-y-px transition-all duration-150 group"
          >
            <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors mt-0.5 shrink-0">
              {s.icon}
            </span>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300 leading-snug transition-colors">
              {s.text}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-zinc-700">
        Press{" "}
        <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 font-mono text-zinc-600">
          ⌘K
        </kbd>{" "}
        to open command palette
      </p>
    </div>
  );
}
