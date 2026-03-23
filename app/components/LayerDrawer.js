"use client";

import { useEffect, useRef } from "react";

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="1"
      x2="23"
      y2="23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function LayerDrawer({ open, layers, onClose, onToggleLayer }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (open) {
      drawerRef.current?.focus();
    }
  }, [open]);

  return (
    <div
      ref={drawerRef}
      className={`absolute top-0 right-0 h-full w-[280px] flex flex-col z-20 transition-transform duration-200 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        background: "rgba(9, 9, 11, 0.96)",
        backdropFilter: "blur(16px)",
        borderLeft: "1px solid #27272a",
        boxShadow: open ? "-8px 0 32px rgba(0,0,0,0.5)" : "none",
      }}
      role="complementary"
      aria-label="Map layers"
      aria-hidden={!open}
      tabIndex={-1}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
        <span className="text-sm font-semibold text-zinc-100">Layers</span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          aria-label="Close layers panel"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Layer list */}
      <div className="flex-1 overflow-y-auto py-1.5" role="list">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="px-3 py-2 hover:bg-zinc-900/60 transition-colors"
            role="listitem"
          >
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onToggleLayer(layer.id)}
                className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors shrink-0 ${
                  layer.visible
                    ? "text-zinc-300 hover:bg-zinc-800"
                    : "text-zinc-700 hover:bg-zinc-800 hover:text-zinc-500"
                }`}
                aria-label={`${layer.visible ? "Hide" : "Show"} ${layer.name}`}
                role="checkbox"
                aria-checked={layer.visible}
              >
                {layer.visible ? <EyeIcon /> : <EyeOffIcon />}
              </button>

              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: layer.visible ? layer.color : "#3f3f46" }}
                aria-hidden="true"
              />

              <span
                className={`text-sm flex-1 ${
                  layer.visible ? "text-zinc-200" : "text-zinc-600"
                }`}
              >
                {layer.name}
              </span>

              {layer.visible && (
                <span className="text-xs text-zinc-700 font-mono">
                  {layer.opacity}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 shrink-0">
        <button className="w-full flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors py-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add layer
        </button>
      </div>
    </div>
  );
}
