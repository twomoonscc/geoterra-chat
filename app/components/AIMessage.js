import DataCard from "./DataCard";

function renderMarkdown(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-zinc-100">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const AIAvatar = () => (
  <div
    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
    style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
    aria-hidden="true"
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
      <path d="M3 12h18" stroke="white" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="white" strokeWidth="1.5" />
    </svg>
  </div>
);

export default function AIMessage({ message, showAvatar }) {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-5 mb-1.5 animate-fade-in" role="article">
      {showAvatar && (
        <div className="flex items-center gap-2 mb-2">
          <AIAvatar />
          <span className="text-xs text-zinc-400 font-medium">GeoTerra</span>
          <span className="text-xs text-zinc-700">{timestamp}</span>
        </div>
      )}

      <div className="ml-8 text-sm leading-relaxed text-zinc-300">
        {renderMarkdown(message.text)}
      </div>

      {message.dataCard && (
        <div className="ml-8 mt-3">
          <DataCard card={message.dataCard} />
        </div>
      )}

      {message.mapAction && (
        <div className="ml-8 mt-2 flex items-center gap-1.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            className="text-blue-500 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs text-blue-500/80">{message.mapAction}</span>
        </div>
      )}
    </div>
  );
}
