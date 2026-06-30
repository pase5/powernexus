"use client";

import React, { useState } from "react";

type EnergyNode = "wind" | "solar" | "substation" | "ev" | "grid";

interface NodeDetails {
  title: string;
  value: string;
  unit: string;
  status: string;
  description: string;
}

const nodeData: Record<EnergyNode, NodeDetails> = {
  wind: {
    title: "Wind Farm Peak Generation",
    value: "142.5",
    unit: "MW",
    status: "Optimal Flow",
    description: "Turbine blades rotating at peak velocity. Winds at 12.4 m/s.",
  },
  solar: {
    title: "Photovoltaic Solar Array",
    value: "88.2",
    unit: "MW",
    status: "Stable Output",
    description: "Bifacial solar panels active. Current solar irradiance at 820 W/m².",
  },
  substation: {
    title: "Smart Grid Substation",
    value: "220/110",
    unit: "kV",
    status: "Normal Load",
    description: "Automated switchgear monitoring voltage distribution levels.",
  },
  ev: {
    title: "EV Fast Charging Station",
    value: "18",
    unit: "units",
    status: "Active Draw",
    description: "Charging station occupied. Smart queue management active.",
  },
  grid: {
    title: "Central Control System",
    value: "98.7",
    unit: "% Sync",
    status: "Frequency Locked",
    description: "Phase lock loops synchronized at 50.02 Hz across all sectors.",
  },
};

export default function SmartGrid() {
  const [activeNode, setActiveNode] = useState<EnergyNode | null>("grid");

  const activeDetails = activeNode ? nodeData[activeNode] : null;

  return (
    <div className="w-full glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-brand-emerald/30">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-emerald-glow blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-forest-glow blur-3xl pointer-events-none rounded-full" />

      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* SVG Grid */}
        <div className="flex-1 w-full relative">
          <svg
            viewBox="0 0 500 400"
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid background reference lines */}
            <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
              <line x1="0" y1="100" x2="500" y2="100" />
              <line x1="0" y1="200" x2="500" y2="200" />
              <line x1="0" y1="300" x2="500" y2="300" />
              <line x1="100" y1="0" x2="100" y2="400" />
              <line x1="200" y1="0" x2="200" y2="400" />
              <line x1="300" y1="0" x2="300" y2="400" />
              <line x1="400" y1="0" x2="400" y2="400" />
            </g>

            {/* Glowing path lines (Marching ants animation) */}
            {/* Wind to Substation */}
            <path
              d="M 120 120 L 250 200"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="8 6"
              className="animate-dash opacity-80"
            />
            {/* Solar to Substation */}
            <path
              d="M 120 280 L 250 200"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="8 6"
              className="animate-dash opacity-80"
              style={{ animationDirection: "reverse" }}
            />
            {/* Substation to Central Grid */}
            <path
              d="M 250 200 L 380 200"
              fill="none"
              stroke="#047857"
              strokeWidth="3"
              strokeDasharray="10 5"
              className="animate-dash"
            />
            {/* Central Grid to EV Station */}
            <path
              d="M 380 200 L 250 320"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="8 6"
              className="animate-dash"
            />

            {/* Node 1: Wind Farm */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode("wind")}
              onClick={() => setActiveNode("wind")}
            >
              <circle
                cx="120"
                cy="120"
                r="35"
                fill="rgba(15, 23, 42, 0.8)"
                stroke={activeNode === "wind" ? "#10b981" : "rgba(255,255,255,0.1)"}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <circle
                cx="120"
                cy="120"
                r="4"
                fill="#10b981"
                className="animate-ping"
              />
              {/* Wind Turbine SVG */}
              <g transform="translate(120, 110) scale(0.65)" stroke="#10b981" fill="none" strokeWidth="2">
                <line x1="0" y1="0" x2="0" y2="30" strokeWidth="3" strokeLinecap="round" />
                {/* Rotating blades */}
                <g className="animate-[spin_6s_linear_infinite]" style={{ transformOrigin: "0px 0px" }}>
                  <path d="M 0 0 L 0 -22" strokeLinecap="round" />
                  <path d="M 0 0 L 19 11" strokeLinecap="round" />
                  <path d="M 0 0 L -19 11" strokeLinecap="round" />
                </g>
              </g>
              <text
                x="120"
                y="170"
                fill="#9ca3af"
                fontSize="11"
                textAnchor="middle"
                className="group-hover:fill-brand-emerald transition-colors"
              >
                Wind Gen
              </text>
            </g>

            {/* Node 2: Solar Array */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode("solar")}
              onClick={() => setActiveNode("solar")}
            >
              <circle
                cx="120"
                cy="280"
                r="35"
                fill="rgba(15, 23, 42, 0.8)"
                stroke={activeNode === "solar" ? "#d97706" : "rgba(255,255,255,0.1)"}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              {/* Solar Array Graphic */}
              <g transform="translate(103, 266) scale(0.85)" fill="none" stroke="#d97706" strokeWidth="1.5">
                <rect x="0" y="0" width="16" height="12" rx="1" />
                <rect x="18" y="0" width="16" height="12" rx="1" />
                <rect x="0" y="15" width="16" height="12" rx="1" />
                <rect x="18" y="15" width="16" height="12" rx="1" />
                <line x1="8" y1="0" x2="8" y2="27" />
                <line x1="26" y1="0" x2="26" y2="27" />
                <line x1="0" y1="6" x2="34" y2="6" />
                <line x1="0" y1="21" x2="34" y2="21" />
              </g>
              <text
                x="120"
                y="330"
                fill="#9ca3af"
                fontSize="11"
                textAnchor="middle"
                className="group-hover:fill-brand-gold transition-colors"
              >
                Solar Array
              </text>
            </g>

            {/* Node 3: Substation */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode("substation")}
              onClick={() => setActiveNode("substation")}
            >
              <circle
                cx="250"
                cy="200"
                r="40"
                fill="rgba(15, 23, 42, 0.8)"
                stroke={activeNode === "substation" ? "#047857" : "rgba(255,255,255,0.1)"}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              {/* Substation Graphic */}
              <g transform="translate(232, 185) scale(0.9)" fill="none" stroke="#047857" strokeWidth="1.8">
                {/* Transformer tower shapes */}
                <path d="M 5 30 L 15 5 L 25 30 Z" />
                <line x1="0" y1="12" x2="30" y2="12" />
                <line x1="5" y1="20" x2="25" y2="20" />
                <circle cx="15" cy="5" r="2" fill="#047857" />
                {/* Electricity sparks indicator */}
                <path
                  d="M -2 0 L 2 5 L -1 9"
                  stroke="#047857"
                  strokeWidth="1.5"
                  className="animate-pulse"
                  transform="translate(15, -12)"
                />
              </g>
              <text
                x="250"
                y="255"
                fill="#9ca3af"
                fontSize="11"
                textAnchor="middle"
                className="group-hover:fill-emerald-400 transition-colors"
              >
                Substation
              </text>
            </g>

            {/* Node 4: EV Charging Station */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode("ev")}
              onClick={() => setActiveNode("ev")}
            >
              <circle
                cx="250"
                cy="320"
                r="32"
                fill="rgba(15, 23, 42, 0.8)"
                stroke={activeNode === "ev" ? "#10b981" : "rgba(255,255,255,0.1)"}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              {/* EV Charging Graphic */}
              <g transform="translate(238, 305) scale(0.85)" fill="none" stroke="#10b981" strokeWidth="2">
                <rect x="2" y="2" width="16" height="24" rx="2" />
                <path d="M 7 14 H 13" />
                {/* Lightning Bolt */}
                <path d="M 11 6 L 7 12 H 12 L 9 18" fill="#10b981" stroke="none" />
                {/* Charging Plug Cord */}
                <path d="M 18 16 C 22 16, 22 24, 25 24" />
              </g>
              <text
                x="250"
                y="368"
                fill="#9ca3af"
                fontSize="11"
                textAnchor="middle"
                className="group-hover:fill-brand-emerald transition-colors"
              >
                EV Station
              </text>
            </g>

            {/* Node 5: Central Smart Grid Hub */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode("grid")}
              onClick={() => setActiveNode("grid")}
            >
              <circle
                cx="380"
                cy="200"
                r="45"
                fill="rgba(15, 23, 42, 0.9)"
                stroke={activeNode === "grid" ? "#10b981" : "rgba(255,255,255,0.1)"}
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
              <circle
                cx="380"
                cy="200"
                r="52"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="10 15"
                className="animate-[spin_20s_linear_infinite]"
              />
              {/* Central Processor Core Graphic */}
              <g transform="translate(362, 182) scale(0.9)" fill="none" stroke="#10b981" strokeWidth="2">
                <circle cx="20" cy="20" r="10" strokeWidth="3" />
                <line x1="20" y1="0" x2="20" y2="7" />
                <line x1="20" y1="33" x2="20" y2="40" />
                <line x1="0" y1="20" x2="7" y2="20" />
                <line x1="33" y1="20" x2="40" y2="20" />
                <circle cx="20" cy="20" r="4" fill="#10b981" />
              </g>
              <text
                x="380"
                y="262"
                fill="#9ca3af"
                fontSize="11"
                textAnchor="middle"
                className="group-hover:fill-brand-emerald transition-colors font-semibold"
              >
                Power Nexus Core
              </text>
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-72 flex flex-col justify-between self-stretch bg-slate-900/50 rounded-xl border border-white/5 p-5 relative">
          {activeDetails ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-full border border-brand-emerald/20">
                  {activeDetails.status}
                </span>
                <h3 className="text-lg font-bold text-white mt-4 font-serif">
                  {activeDetails.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {activeDetails.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  System Value
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-forest tracking-tight">
                    {activeDetails.value}
                  </span>
                  <span className="text-sm font-semibold text-gray-300">
                    {activeDetails.unit}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              Hover over grid nodes to analyze real-time grid metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
