"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useMemo } from "react";

const WEEKS = 24;
const DAYS = 7;

// Seeded PRNG (mulberry32) — ensures server and client produce identical grids
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateGrid(): number[][] {
  const rand = mulberry32(42);
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const r = rand();
      if (r < 0.35) week.push(0);
      else if (r < 0.6) week.push(1);
      else if (r < 0.8) week.push(2);
      else if (r < 0.93) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
}

// Cyan at varying opacity levels for intensity (pre-computed for Tailwind v4 compat)
const intensityColor: Record<number, string> = {
  0: "bg-[#161b22]",
  1: "bg-[rgba(6,182,212,0.25)]",
  2: "bg-[rgba(6,182,212,0.50)]",
  3: "bg-[rgba(6,182,212,0.75)]",
  4: "bg-[#06b6d4]",
};

// Month labels for the grid header
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
];

export default function ActivityTile() {
  const grid = useMemo(() => generateGrid(), []);

  return (
    <motion.article
      className="tile-glow relative rounded-2xl bg-surface p-6 overflow-hidden flex flex-col h-full"
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="grain-overlay" />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-5">
          <Activity size={16} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Activity</h2>
        </div>

        {/* Month labels */}
        <div className="flex gap-[3px] mb-2 pl-0">
          {MONTH_LABELS.map((month, i) => (
            <span
              key={i}
              className="text-[10px] text-muted"
              style={{ width: `${(WEEKS / MONTH_LABELS.length) * (13 + 3)}px`, flexShrink: 0 }}
            >
              {month}
            </span>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="flex gap-[3px] overflow-x-auto pb-1 flex-1 items-start">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={`${wi}-${di}`}
                  className={`contrib-cell ${intensityColor[level]}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: wi * 0.02 + di * 0.01,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-5">
          <span className="text-[11px] text-muted mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[13px] h-[13px] rounded-[3px] ${intensityColor[level]}`}
            />
          ))}
          <span className="text-[11px] text-muted ml-1">More</span>
        </div>
      </div>
    </motion.article>
  );
}
