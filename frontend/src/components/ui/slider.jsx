import React from "react";
import { cn } from "@/lib/utils";

export function Slider({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }) {
  const val = Array.isArray(value) ? value[0] : value;
  const handleChange = (e) => {
    onValueChange && onValueChange([parseFloat(e.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={val}
      onChange={handleChange}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50",
        className
      )}
      {...props}
    />
  );
}
