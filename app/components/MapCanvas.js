"use client";

import { useState, useCallback } from "react";

const MAP_CENTER = { lat: 37.7749, lng: -122.4194 };

function MapSVG({ mapUpdated }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 900 650"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Subtle lat/lng grid */}
      <g stroke="#1a2840" strokeWidth="0.5" opacity="0.8">
        {[90, 180, 270, 360, 450, 540, 630, 720, 810].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="650" />
        ))}
        {[65, 130, 195, 260, 325, 390, 455, 520, 585].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="900" y2={y} />
        ))}
      </g>

      {/* Major roads */}
      <g
        stroke="#2d3f52"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M0 220 Q220 210 450 225 Q680 240 900 220" />
        <path d="M0 440 Q220 430 450 445 Q680 460 900 440" />
        <path d="M220 0 Q230 165 220 325 Q210 490 220 650" />
        <path d="M560 0 Q570 165 560 325 Q550 490 560 650" />
      </g>

      {/* Primary roads */}
      <g stroke="#3a4f65" strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M0 325 L900 325" />
        <path d="M390 0 L390 650" />
      </g>

      {/* City blocks */}
      <g fill="#152233" stroke="#1e3248" strokeWidth="0.5">
        <rect x="50" y="50" width="130" height="80" rx="2" />
        <rect x="190" y="50" width="90" height="80" rx="2" />
        <rect x="290" y="50" width="80" height="80" rx="2" />
        <rect x="50" y="140" width="160" height="60" rx="2" />
        <rect x="220" y="140" width="150" height="60" rx="2" />

        <rect x="420" y="50" width="110" height="90" rx="2" />
        <rect x="540" y="50" width="90" height="90" rx="2" />
        <rect x="420" y="150" width="210" height="50" rx="2" />

        <rect x="50" y="240" width="150" height="65" rx="2" />
        <rect x="210" y="240" width="150" height="65" rx="2" />
        <rect x="420" y="240" width="120" height="65" rx="2" />
        <rect x="550" y="240" width="100" height="65" rx="2" />

        <rect x="50" y="355" width="100" height="65" rx="2" />
        <rect x="160" y="355" width="120" height="65" rx="2" />
        <rect x="290" y="355" width="80" height="65" rx="2" />
        <rect x="420" y="355" width="80" height="65" rx="2" />
        <rect x="510" y="355" width="130" height="65" rx="2" />

        <rect x="50" y="460" width="210" height="90" rx="2" />
        <rect x="270" y="460" width="110" height="90" rx="2" />
        <rect x="420" y="460" width="200" height="90" rx="2" />

        <rect x="660" y="50" width="200" height="160" rx="2" />
        <rect x="660" y="220" width="200" height="110" rx="2" />
        <rect x="660" y="340" width="200" height="210" rx="2" />
      </g>

      {/* Water body */}
      <path
        d="M100 540 Q160 520 220 545 Q290 570 350 545 Q400 525 430 560 L430 650 L100 650 Z"
        fill="#0c1f35"
        stroke="#183350"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Water texture */}
      <g stroke="#152d48" strokeWidth="0.5" opacity="0.6">
        <path d="M120 575 Q180 565 240 575" />
        <path d="M150 595 Q210 585 280 595" />
        <path d="M180 615 Q240 605 310 615" />
      </g>

      {/* Green space / park */}
      <rect
        x="640"
        y="460"
        width="120"
        height="90"
        rx="4"
        fill="#0f2a1a"
        stroke="#1a3d25"
        strokeWidth="1"
      />
      <rect
        x="640"
        y="460"
        width="120"
        height="90"
        rx="4"
        fill="#1a3d25"
        fillOpacity="0.4"
      />

      {/* Map update highlights */}
      {mapUpdated && (
        <g>
          <rect
            x="160"
            y="240"
            width="220"
            height="130"
            rx="3"
            fill="#3b82f6"
            fillOpacity="0.12"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            className="animate-map-pulse"
          />
          <rect
            x="420"
            y="240"
            width="230"
            height="130"
            rx="3"
            fill="#3b82f6"
            fillOpacity="0.12"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            className="animate-map-pulse"
            style={{ animationDelay: "0.1s" }}
          />
          <rect
            x="50"
            y="355"
            width="320"
            height="65"
            rx="3"
            fill="#3b82f6"
            fillOpacity="0.08"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeOpacity="0.3"
            className="animate-map-pulse"
            style={{ animationDelay: "0.2s" }}
          />
        </g>
      )}

      {/* Location markers */}
      <g>
        {/* Primary marker */}
        <circle cx="390" cy="325" r="5" fill="#3b82f6" />
        <circle cx="390" cy="325" r="10" fill="#3b82f6" fillOpacity="0.2" />
        <circle cx="390" cy="325" r="16" fill="#3b82f6" fillOpacity="0.08" />
        {/* Secondary markers */}
        <circle cx="180" cy="395" r="3.5" fill="#22c55e" />
        <circle cx="180" cy="395" r="7" fill="#22c55e" fillOpacity="0.2" />
        <circle cx="520" cy="270" r="3.5" fill="#22c55e" />
        <circle cx="520" cy="270" r="7" fill="#22c55e" fillOpacity="0.2" />
        <circle cx="280" cy="170" r="3" fill="#f59e0b" />
        <circle cx="280" cy="170" r="6" fill="#f59e0b" fillOpacity="0.2" />
        <circle cx="650" cy="380" r="3" fill="#8b5cf6" />
        <circle cx="650" cy="380" r="6" fill="#8b5cf6" fillOpacity="0.2" />
      </g>
    </svg>
  );
}

export default function MapCanvas({
  layers,
  mapUpdated,
  onToggleDrawer,
  layerDrawerOpen,
}) {
  const [coords, setCoords] = useState({
    lat: MAP_CENTER.lat,
    lng: MAP_CENTER.lng,
  });
  const [zoom, setZoom] = useState(12);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCoords({
      lat: (MAP_CENTER.lat + (0.5 - y) * 0.12).toFixed(4),
      lng: (MAP_CENTER.lng + (x - 0.5) * 0.18).toFixed(4),
    });
  }, []);

  const hasActiveDataLayers = layers.some(
    (l) => l.visible && l.id !== "basemap" && l.id !== "roads"
  );

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, #0d1e30 0%, #090f18 60%)",
      }}
      role="application"
      aria-label="Interactive map displaying geospatial data"
      onMouseMove={handleMouseMove}
    >
      <MapSVG mapUpdated={mapUpdated} />

      {/* Progress bar on map update */}
      {mapUpdated && (
        <div
          key={Date.now()}
          className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 z-10 animate-progress-bar origin-left"
        />
      )}

      {/* Zoom controls */}
      <div
        className="absolute top-4 right-4 z-10 flex flex-col rounded-lg overflow-hidden border border-zinc-700/60"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <button
          onClick={() => setZoom((z) => Math.min(z + 1, 20))}
          className="w-9 h-9 flex items-center justify-center bg-zinc-900/85 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/90 transition-colors border-b border-zinc-700/60 text-base font-light leading-none"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 1, 1))}
          className="w-9 h-9 flex items-center justify-center bg-zinc-900/85 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/90 transition-colors text-base font-light leading-none"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>

      {/* Layer toggle */}
      <div className="absolute bottom-14 right-4 z-10">
        <button
          onClick={onToggleDrawer}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
            layerDrawerOpen
              ? "bg-blue-500/15 border-blue-500/50 text-blue-400"
              : "bg-zinc-900/85 border-zinc-700/60 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/90"
          }`}
          style={{ backdropFilter: "blur(8px)" }}
          aria-label="Toggle layers panel"
          aria-expanded={layerDrawerOpen}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 17l10 5 10-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Coordinate readout */}
      <div
        className="absolute bottom-4 left-4 z-10 px-2 py-1 rounded text-xs text-zinc-500 bg-zinc-950/75"
        style={{
          backdropFilter: "blur(4px)",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {coords.lat}°N {Math.abs(coords.lng)}°W · z{zoom}
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-end gap-1.5">
        <div className="flex h-2 w-14 border border-zinc-600/50 border-t-0 overflow-hidden">
          <div className="w-1/2 bg-zinc-500/60" />
        </div>
        <span
          className="text-xs text-zinc-600"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          500m
        </span>
      </div>

      {/* No data layer hint */}
      {!hasActiveDataLayers && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="text-xs text-zinc-700 bg-zinc-950/50 px-3 py-1.5 rounded-full">
            Ask a question to see data on the map
          </span>
        </div>
      )}
    </div>
  );
}
