import React from "react";
import { BookOpen } from "lucide-react";

export function Logo({ size = 40, withText = true, textClass = "" }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 text-sky-500 shadow-sm border border-sky-200"
        style={{ width: size, height: size }}
      >
        <BookOpen style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.4} />
        <span
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white animate-pulse"
          aria-hidden
        />
      </div>
      {withText && (
        <div className={`leading-none ${textClass}`}>
          <div className="font-heading text-lg font-bold tracking-tight text-slate-800">
            ReadLocal <span className="text-sky-500 font-bold">Kids</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-amber-500">
            Read English · Discover Culture
          </div>
        </div>
      )}
    </div>
  );
}
