"use client";

import React, { useRef } from "react";
import { Download, Share2, ShieldCheck, Ticket as TicketIcon } from "lucide-react";

interface TicketProps {
  attendee: {
    name: string;
    email: string;
    institution: string;
    category: string;
    ticketId: string;
  };
}

export default function Ticket({ attendee }: TicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-float">
      {/* Glow effect surrounding the ticket */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-emerald via-brand-forest to-brand-gold rounded-2xl blur opacity-30 animate-pulse-slow" />
      
      {/* Main Ticket body */}
      <div
        ref={ticketRef}
        className="relative bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-left"
      >
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        
        {/* Glowing Orbs */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-emerald/20 blur-2xl rounded-full" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-brand-gold/10 blur-2xl rounded-full" />

        {/* Top Header Section */}
        <div className="p-6 border-b border-white/5 bg-slate-900/60 flex justify-between items-center relative">
          <div>
            <div className="text-[10px] tracking-widest text-brand-gold font-extrabold uppercase">
              Official Entry Pass
            </div>
            <h4 className="text-xl font-bold font-serif text-white tracking-wide mt-1">
              POWERNEXUS
            </h4>
            <p className="text-[10px] text-gray-400 font-medium">
              IEEE PES Webinar Series • July 2026
            </p>
          </div>
          <div className="flex flex-col items-end">
            <TicketIcon className="w-8 h-8 text-brand-emerald animate-pulse" />
            <span className="text-[10px] font-mono text-brand-emerald mt-1">
              {attendee.ticketId}
            </span>
          </div>
        </div>

        {/* Middle Info Section */}
        <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4 relative">
          <div className="col-span-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              ATTENDEE NAME
            </div>
            <div className="text-lg font-bold text-white mt-1 font-serif tracking-wide truncate">
              {attendee.name}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              CATEGORY
            </div>
            <div className="text-sm font-semibold text-brand-emerald mt-1 capitalize">
              {attendee.category}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              ORGANIZATION / INSTITUTION
            </div>
            <div className="text-sm font-semibold text-white mt-1 truncate">
              {attendee.institution}
            </div>
          </div>

          <div className="col-span-2 pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                DATE / PLATFORM
              </div>
              <div className="text-xs font-semibold text-gray-300 mt-1">
                Starting 10 July 2026 • Webex/Zoom
              </div>
            </div>
            <div className="bg-brand-emerald/10 border border-brand-emerald/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Barcode / Tear strip section */}
        <div className="border-t-2 border-dashed border-slate-900 bg-slate-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          {/* Simulated Ticket Stub Notch (left) */}
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-brand-bg-dark rounded-r-full border-r border-white/10" />
          {/* Simulated Ticket Stub Notch (right) */}
          <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-brand-bg-dark rounded-l-full border-l border-white/10" />

          {/* Barcode Graphic */}
          <div className="flex flex-col items-center sm:items-start gap-1 w-full sm:w-auto">
            {/* SVG Barcode lines */}
            <svg className="w-48 h-8 opacity-80" xmlns="http://www.w3.org/2000/svg">
              <g fill="#94a3b8">
                <rect x="0" width="3" height="32" />
                <rect x="5" width="1" height="32" />
                <rect x="8" width="4" height="32" />
                <rect x="14" width="2" height="32" />
                <rect x="18" width="1" height="32" />
                <rect x="22" width="3" height="32" />
                <rect x="27" width="1" height="32" />
                <rect x="30" width="2" height="32" />
                <rect x="35" width="4" height="32" />
                <rect x="41" width="1" height="32" />
                <rect x="44" width="3" height="32" />
                <rect x="49" width="2" height="32" />
                <rect x="54" width="1" height="32" />
                <rect x="58" width="4" height="32" />
                <rect x="64" width="2" height="32" />
                <rect x="68" width="1" height="32" />
                <rect x="71" width="3" height="32" />
                <rect x="76" width="2" height="32" />
                <rect x="80" width="4" height="32" />
                <rect x="86" width="1" height="32" />
                <rect x="89" width="3" height="32" />
                <rect x="94" width="2" height="32" />
                <rect x="98" width="4" height="32" />
                <rect x="104" width="1" height="32" />
                <rect x="107" width="3" height="32" />
                <rect x="112" width="2" height="32" />
                <rect x="116" width="1" height="32" />
                <rect x="120" width="4" height="32" />
                <rect x="126" width="2" height="32" />
                <rect x="130" width="1" height="32" />
                <rect x="133" width="3" height="32" />
                <rect x="138" width="2" height="32" />
                <rect x="142" width="4" height="32" />
                <rect x="148" width="1" height="32" />
                <rect x="151" width="3" height="32" />
                <rect x="156" width="2" height="32" />
                <rect x="160" width="4" height="32" />
                <rect x="166" width="1" height="32" />
                <rect x="170" width="3" height="32" />
                <rect x="175" width="2" height="32" />
                <rect x="180" width="1" height="32" />
                <rect x="184" width="4" height="32" />
              </g>
            </svg>
            <span className="text-[8px] font-mono text-gray-500 tracking-[0.3em] uppercase mt-1">
              *PN-{attendee.ticketId.split("-")[1] || "2026"}*
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Print Pass
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(
                    `I just registered for POWERNEXUS - IEEE Technical Webinar Series! My Entry Pass ID is ${attendee.ticketId}. Join here: https://powernexus.ceal.in`
                  );
                  alert("Registration status and link copied to clipboard!");
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-emerald hover:bg-brand-emerald/85 text-xs font-semibold text-slate-950 transition-all cursor-pointer shadow-md shadow-brand-emerald/20"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
        A confirmation email containing Webinar access links, calendar invites, and instructions has been dispatched to{" "}
        <span className="text-brand-emerald font-semibold">{attendee.email}</span>.
      </p>
    </div>
  );
}
