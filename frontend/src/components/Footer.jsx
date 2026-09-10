import React from "react";
import { Logo } from "@/components/Logo";

export function Footer({ showLogo = true }) {
  return (
    <footer className="border-t border-slate-100 py-6 text-center text-sm text-slate-500 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2.5 px-5">
        {showLogo && <Logo size={30} />}
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 font-medium text-slate-600">
          <span>©2026 by</span>
          <a
            href="https://sinta.kemdiktisaintek.go.id/authors/profile/6010144"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
          >
            Mam Yulini
          </a>
          <span>&</span>
          <a
            href="https://www.instagram.com/unge_padaunan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
          >
            Miss Bunga
          </a>
          <span className="mx-1 text-slate-300">|</span>
          <span>UI/UX by</span>
          <a
            href="https://www.linkedin.com/in/papedatimur"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
          >
            Enterdie
          </a>
        </p>
      </div>
    </footer>
  );
}
