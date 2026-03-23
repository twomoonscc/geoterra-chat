"use client";

import { useReducer, useState, useEffect, useCallback } from "react";
import Header from "./Header";
import ChatPanel from "./ChatPanel";
import MapCanvas from "./MapCanvas";
import LayerDrawer from "./LayerDrawer";
import CommandPalette from "./CommandPalette";

const INITIAL_LAYERS = [
  { id: "basemap", name: "Base Map", visible: true, opacity: 100, color: "#3b82f6" },
  { id: "roads", name: "Road Network", visible: true, opacity: 90, color: "#a1a1aa" },
  { id: "parcels", name: "Land Parcels", visible: false, opacity: 80, color: "#22c55e" },
  { id: "flood", name: "Flood Risk Zones", visible: false, opacity: 70, color: "#ef4444" },
  { id: "population", name: "Population Density", visible: false, opacity: 60, color: "#8b5cf6" },
];

const AI_RESPONSES = [
  {
    keywords: ["flood", "risk", "zone"],
    text: "I've identified **3 flood risk zones** in the current map view. Zone A covers the low-lying riverside area with high risk, Zone B covers the mid-valley with moderate risk, and Zone C covers elevated residential areas with low risk.",
    dataCard: {
      type: "stats",
      stats: [
        { value: "3", label: "Risk Zones", trend: null },
        { value: "12.4 km²", label: "Total Area", trend: null },
        { value: "847", label: "Affected Parcels", trend: "+12%" },
      ],
    },
    mapAction: "Added Flood Risk Zones layer",
    activateLayer: "flood",
  },
  {
    keywords: ["population", "density", "people"],
    text: "Here's the population density breakdown for the selected region. The highest concentration is in the central urban core with **4,200 people/km²**, declining toward suburban and rural areas.",
    dataCard: {
      type: "table",
      headers: ["District", "Population", "Density"],
      rows: [
        ["Central Core", "84,000", "4,200/km²"],
        ["North Suburb", "32,400", "1,620/km²"],
        ["East Suburb", "28,100", "1,405/km²"],
        ["South Rural", "6,200", "124/km²"],
      ],
    },
    mapAction: "Updated map view",
    activateLayer: "population",
  },
  {
    keywords: ["parcel", "propert", "5km", "near", "within"],
    text: "Found **234 parcels** within the specified area. I've highlighted them on the map. Most are zoned residential (78%), with some commercial (16%) and mixed-use (6%) properties.",
    dataCard: {
      type: "table",
      headers: ["Zone Type", "Count", "Avg Area"],
      rows: [
        ["Residential", "183", "620 m²"],
        ["Commercial", "37", "1,840 m²"],
        ["Mixed Use", "14", "980 m²"],
      ],
    },
    mapAction: "Highlighted 234 parcels",
    activateLayer: "parcels",
  },
  {
    keywords: ["distance", "measure", "between"],
    text: "Measurement complete. The distance between the selected points is **4.7 km** along the direct line, and **5.9 km** following the road network.",
    dataCard: {
      type: "stats",
      stats: [
        { value: "4.7 km", label: "Direct distance", trend: null },
        { value: "5.9 km", label: "Road distance", trend: null },
        { value: "7 min", label: "Est. drive time", trend: null },
      ],
    },
    mapAction: "Added measurement overlay",
    activateLayer: null,
  },
];

const DEFAULT_RESPONSE = {
  text: "I've analyzed the geospatial data for your query. The map has been updated to show the relevant features. You can refine the search by specifying a geographic area or adding additional filters.",
  dataCard: null,
  mapAction: "Updated map view",
  activateLayer: null,
};

function getAIResponse(input) {
  const lower = input.toLowerCase();
  for (const response of AI_RESPONSES) {
    if (response.keywords.some((k) => lower.includes(k))) {
      return response;
    }
  }
  return DEFAULT_RESPONSE;
}

function messagesReducer(state, action) {
  switch (action.type) {
    case "ADD_USER_MESSAGE":
      return [
        ...state,
        { id: Date.now(), role: "user", text: action.text, status: "sent" },
      ];
    case "ADD_AI_MESSAGE":
      return [
        ...state,
        {
          id: action.id,
          role: "ai",
          text: action.text,
          dataCard: action.dataCard,
          mapAction: action.mapAction,
        },
      ];
    default:
      return state;
  }
}

export default function ChatApp() {
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [isThinking, setIsThinking] = useState(false);
  const [layerDrawerOpen, setLayerDrawerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [layers, setLayers] = useState(INITIAL_LAYERS);
  const [mapUpdated, setMapUpdated] = useState(false);

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim() || isThinking) return;

      dispatch({ type: "ADD_USER_MESSAGE", text });
      setIsThinking(true);

      await new Promise((r) => setTimeout(r, 1400));

      const response = getAIResponse(text);
      const aiId = Date.now();

      dispatch({
        type: "ADD_AI_MESSAGE",
        id: aiId,
        text: response.text,
        dataCard: response.dataCard,
        mapAction: response.mapAction,
      });

      setIsThinking(false);
      setMapUpdated(true);
      setTimeout(() => setMapUpdated(false), 2000);

      if (response.activateLayer) {
        setLayers((prev) =>
          prev.map((l) =>
            l.id === response.activateLayer ? { ...l, visible: true } : l
          )
        );
      }
    },
    [isThinking]
  );

  const handleToggleLayer = useCallback((layerId) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l))
    );
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
        setLayerDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col h-dvh bg-zinc-950 text-zinc-50 overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ChatPanel
          messages={messages}
          isThinking={isThinking}
          onSend={handleSend}
          layers={layers}
        />
        <div className="relative flex-1 overflow-hidden">
          <MapCanvas
            layers={layers}
            mapUpdated={mapUpdated}
            onToggleDrawer={() => setLayerDrawerOpen((prev) => !prev)}
            layerDrawerOpen={layerDrawerOpen}
          />
          <LayerDrawer
            open={layerDrawerOpen}
            layers={layers}
            onClose={() => setLayerDrawerOpen(false)}
            onToggleLayer={handleToggleLayer}
          />
        </div>
      </div>
      {commandPaletteOpen && (
        <CommandPalette
          layers={layers}
          onClose={() => setCommandPaletteOpen(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
