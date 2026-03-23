"use client";

import { useState, useEffect, useRef } from "react";

const QUICK_QUERIES = [
  { id: "flood", label: "Highlight flood risk zones", category: "Quick Query" },
  { id: "population", label: "Show population density", category: "Quick Query" },
  { id: "parcels", label: "Find parcels near the river", category: "Quick Query" },
  { id: "distance", label: "Measure distance between points", category: "Quick Query" },
];

const MAP_ACTIONS = [
  { id: "zoom-in", label: "Zoom in", category: "Map Controls" },
  { id: "zoom-out", label: "Zoom out", category: "Map Controls" },
  { id: "reset", label: "Reset map view", category: "Map Controls" },
];

function LayerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CommandPalette({ layers, onClose, onSend }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const layerItems = layers.map((l) => ({
    id: `layer-${l.id}`,
    label: l.name,
    category: "Layers",
    visible: l.visible,
    isLayer: true,
  }));

  const allItems = [
    ...QUICK_QUERIES,
    ...MAP_ACTIONS,
    ...layerItems,
  ];

  const filtered = query
    ? allItems.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const handleSelect = (item) => {
    const quickQuery = QUICK_QUERIES.find((q) => q.id === item.id);
    if (quickQuery) {
      onSend(quickQuery.label);
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      const item = flatFiltered[selected];
      if (item) handleSelect(item);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ paddingTop: "18vh" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/70"
        style={{ backdropFilter: "blur(4px)" }}
      />

      {/* Palette */}
      <div
        className="relative w-full max-w-[480px] mx-4 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden animate-fade-in"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        {/* Search */}
        <div className="flex items-center px-4 h-12 border-b border-zinc-800">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="text-zinc-600 shrink-0 mr-3"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands, layers, queries..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 outline-none"
            aria-label="Command search"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
          />
          <kbd className="text-xs text-zinc-700 border border-zinc-800 rounded px-1.5 py-0.5 font-mono shrink-0">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-1.5" role="listbox">
          {flatFiltered.length === 0 ? (
            <div className="text-center text-sm text-zinc-600 py-10">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-1.5 text-xs text-zinc-600 font-medium tracking-wide uppercase">
                  {category}
                </div>
                {items.map((item) => {
                  const idx = flatFiltered.indexOf(item);
                  const isSelected = idx === selected;
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors border-l-2 ${
                        isSelected
                          ? "bg-blue-500/12 border-blue-500 text-zinc-100"
                          : "border-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                      }`}
                      onClick={() => handleSelect(item)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span
                        className={`shrink-0 ${
                          isSelected ? "text-blue-400" : "text-zinc-600"
                        }`}
                      >
                        {category === "Map Controls" ? (
                          <MapIcon />
                        ) : (
                          <LayerIcon />
                        )}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {"visible" in item && (
                        <span
                          className={`text-xs ${
                            item.visible ? "text-green-600" : "text-zinc-700"
                          }`}
                        >
                          {item.visible ? "visible" : "hidden"}
                        </span>
                      )}
                      {category === "Quick Query" && (
                        <span className="text-xs text-zinc-700 font-mono">
                          ↵
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-800/60">
          <span className="text-xs text-zinc-700 flex items-center gap-1">
            <kbd className="border border-zinc-800 rounded px-1 font-mono text-zinc-700">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span className="text-xs text-zinc-700 flex items-center gap-1">
            <kbd className="border border-zinc-800 rounded px-1 font-mono text-zinc-700">
              ↵
            </kbd>{" "}
            select
          </span>
          <span className="text-xs text-zinc-700 flex items-center gap-1">
            <kbd className="border border-zinc-800 rounded px-1 font-mono text-zinc-700">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
