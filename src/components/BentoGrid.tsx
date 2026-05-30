"use client";

import { motion } from "framer-motion";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import type { Course } from "@/types/database";

interface BentoGridProps {
  courses: Course[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const tile = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  // Split courses: first 3 get 1-col tiles, last one spans 2 cols
  const regularCourses = courses.slice(0, 3);
  const lastCourse = courses.length >= 4 ? courses[courses.length - 1] : null;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Row 1: Hero tile (2 cols) + Activity tile (1 col, spans rows) */}
      <motion.div variants={tile} className="col-span-1 md:col-span-2">
        <HeroTile name="Rishabh" streak={14} />
      </motion.div>

      <motion.div
        variants={tile}
        className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2"
      >
        <ActivityTile />
      </motion.div>

      {/* Regular course tiles */}
      {regularCourses.map((course) => (
        <motion.div key={course.id} variants={tile}>
          <CourseTile course={course} />
        </motion.div>
      ))}

      {/* Last course spans 2 columns to fill the row */}
      {lastCourse && (
        <motion.div key={lastCourse.id} variants={tile} className="md:col-span-2 lg:col-span-2">
          <CourseTile course={lastCourse} />
        </motion.div>
      )}
    </motion.div>
  );
}
