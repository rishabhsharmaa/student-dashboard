"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DynamicIcon from "./DynamicIcon";
import type { Course } from "@/types/database";

// Per-course icon hue mapping within the cyan family
const iconHueMap: Record<string, string> = {
  atom: "#06b6d4",
  network: "#0891b2",
  "file-code-2": "#22d3ee",
  server: "#67e8f9",
};

const iconBgMap: Record<string, string> = {
  atom: "rgba(6,182,212,0.10)",
  network: "rgba(8,145,178,0.10)",
  "file-code-2": "rgba(34,211,238,0.10)",
  server: "rgba(103,232,249,0.10)",
};

interface CourseTileProps {
  course: Course;
  className?: string;
}

export default function CourseTile({ course, className }: CourseTileProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const iconColor = iconHueMap[course.icon_name] ?? "#06b6d4";
  const iconBg = iconBgMap[course.icon_name] ?? "rgba(6,182,212,0.10)";

  return (
    <motion.article
      ref={ref}
      className={`tile-glow relative rounded-2xl bg-surface p-6 overflow-hidden flex flex-col ${className ?? ""}`}
      whileHover={{ scale: 1.018 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Abstract gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(6,182,212,0.08), transparent), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(8,145,178,0.05), transparent)",
        }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
          style={{ background: iconBg }}
        >
          <DynamicIcon name={course.icon_name} size={20} style={{ color: iconColor }} />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-foreground mb-1 leading-snug">
          {course.title}
        </h2>

        {/* Progress label */}
        <span className="text-xs text-muted mb-4 mt-auto">
          {course.progress}% complete
        </span>

        {/* Progress bar */}
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={inView ? { width: `${course.progress}%` } : { width: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
