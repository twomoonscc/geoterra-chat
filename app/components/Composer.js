"use client";

import { useState, useRef, useEffect } from "react";

export default function Composer({ onSend, disabled, activeLayerCount }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const hasValue = value.trim().length > 0;

  return (
    <div
      className="shrink-0 border-t border-zinc-800 bg-zinc-900 px-4 pt-3 pb-4"
      role="region"
      aria-label="Message composer"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask about your geospatial data..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 resize-none outline-none leading-relaxed py-0.5 min-h-[28px] max-h-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Message input. Press Enter to send, Shift+Enter for new line."
          style={{ fontFamily: "var(--font-geist-sans)" }}
        />
        <button
          onClick={handleSend}
          disabled={!hasValue || disabled}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
            hasValue && !disabled
              ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer active:scale-95"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          }`}
          aria-label="Send message"
        >
          {disabled ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-spin"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="40 20"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {activeLayerCount > 0 && (
        <div className="flex items-center gap-2 mt-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 h-5 rounded-full bg-zinc-800 text-xs text-zinc-500">
            <span className="w-1 h-1 rounded-full bg-blue-500" aria-hidden="true" />
            {activeLayerCount} layer{activeLayerCount !== 1 ? "s" : ""} active
          </span>
        </div>
      )}
    </div>
  );
}
