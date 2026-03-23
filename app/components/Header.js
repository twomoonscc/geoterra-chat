export default function Header() {
  return (
    <header
      className="flex items-center px-4 border-b border-zinc-800 bg-zinc-950 shrink-0"
      style={{ height: "var(--gt-header-height, 48px)" }}
    >
      <div className="flex items-center gap-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0"
          aria-hidden="true"
        >
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
          <path
            d="M12 3C9.5 7 9.5 17 12 21"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
        </svg>
        <span className="text-sm font-semibold text-zinc-50 tracking-tight">
          GeoTerra Chat
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-xs text-zinc-400">Connected</span>
      </div>

      <button
        className="ml-4 w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        aria-label="Settings"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
