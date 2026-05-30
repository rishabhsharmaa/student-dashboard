"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 mb-6">
        <AlertTriangle size={28} className="text-red-400" />
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-muted max-w-md mb-6">
        We couldn&apos;t load your dashboard data. This might be a temporary
        issue with the database connection.
      </p>
      <p className="text-xs text-muted/60 mb-6 font-mono max-w-md break-all">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
      >
        <RefreshCw size={14} />
        Try again
      </button>
    </motion.section>
  );
}
