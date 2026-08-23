import React from "react";
import { cn } from "@/lib/utils";

const STYLES = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  Advanced: "bg-rose-100 text-rose-700 border-rose-200",
};

export function LevelBadge({ level, className }) {
  return (
    <span
      data-testid={`level-badge-${level?.toLowerCase()}`}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold",
        STYLES[level] || "bg-slate-100 text-slate-600 border-slate-200",
        className
      )}
    >
      {level}
    </span>
  );
}
