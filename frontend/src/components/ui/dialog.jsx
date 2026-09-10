import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children, maxWidth = "max-w-xl", className, portalClassName }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6", portalClassName)}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      {/* Content wrapper */}
      <div className={cn("relative z-10 w-full transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-bounce-in", maxWidth, className)}>
        <button
          type="button"
          onClick={() => onOpenChange && onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900/80 backdrop-blur-md transition-colors cursor-pointer shadow-md"
          aria-label="Close"
          data-testid="dialog-close-btn"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }) {
  return (
    <h2 className={cn("font-heading text-xl font-bold text-slate-800", className)} {...props}>
      {children}
    </h2>
  );
}
