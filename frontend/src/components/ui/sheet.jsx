import React, { createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SheetContext = createContext(null);

export function Sheet({ children, open, onOpenChange }) {
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

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild }) {
  const { open, onOpenChange } = useContext(SheetContext);
  
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: (e) => {
        if (onOpenChange) onOpenChange(!open);
        if (children.props.onClick) children.props.onClick(e);
      }
    });
  }

  return (
    <button type="button" onClick={() => onOpenChange && onOpenChange(!open)}>
      {children}
    </button>
  );
}

export function SheetContent({ className, side = "left", children, ...props }) {
  const { open, onOpenChange } = useContext(SheetContext);
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      {/* Content wrapper */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-10 w-full bg-white p-6 shadow-2xl transition-all duration-300 ease-in-out",
          side === "left" ? "left-0" : "right-0",
          className
        )}
        {...props}
      >
        <button
          onClick={() => onOpenChange && onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
