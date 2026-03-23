export default function ThinkingIndicator() {
  return (
    <div className="px-5 mb-2 animate-fade-in" aria-label="GeoTerra is thinking" aria-live="polite">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
            <path d="M3 12h18" stroke="white" strokeWidth="1.5" />
            <ellipse
              cx="12"
              cy="12"
              rx="4"
              ry="9"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="text-xs text-zinc-400 font-medium">GeoTerra</span>
      </div>

      <div className="ml-8 flex items-center gap-1.5 py-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-thinking"
            style={{ animationDelay: `${i * 160}ms` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
