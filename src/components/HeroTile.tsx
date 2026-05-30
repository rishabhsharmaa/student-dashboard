"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export default function HeroTile({ name, streak }: HeroTileProps) {
  return (
    <motion.article
      className="tile-glow relative rounded-2xl bg-surface p-8 col-span-1 md:col-span-2 overflow-hidden"
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Cyan radial glow in top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 85% 15%, rgba(6,182,212,0.12), transparent 70%)",
        }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-accent" />
          <span className="text-xs font-medium text-muted uppercase tracking-widest">
            Dashboard
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mb-2">
          Welcome back, {name}
        </h1>

        <p className="text-[13px] text-slate-400 mb-6">
          Keep the momentum going. You&apos;re doing great.
        </p>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border"
            style={{ background: "#161b22" }}
          >
            <span
              className="flex items-center justify-center"
              style={{
                filter: "drop-shadow(0 0 6px rgba(251,146,60,0.5))",
              }}
            >
              <Flame size={16} className="text-orange-400" />
            </span>
            <span className="text-sm font-medium text-foreground">
              {streak}
            </span>
            <span className="text-xs text-muted">day streak</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
