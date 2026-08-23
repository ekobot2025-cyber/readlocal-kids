import React from "react";
import { Star } from "lucide-react";

export function ScoreStars({ count = 3, total = 3, size = 28 }) {
  return (
    <div className="flex items-center justify-center gap-1" data-testid="score-stars">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}
