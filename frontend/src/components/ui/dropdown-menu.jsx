import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const DropdownContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild }) {
  const { open, setOpen } = useContext(DropdownContext);
  
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: (e) => {
        setOpen(!open);
        if (children.props.onClick) children.props.onClick(e);
      }
    });
  }

  return (
    <button type="button" onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, align = "right", children, ...props }) {
  const { open } = useContext(DropdownContext);
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 rounded-2xl border-2 border-slate-100 bg-white p-1.5 shadow-xl",
        align === "right" || align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, children, onClick, ...props }) {
  const { setOpen } = useContext(DropdownContext);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className }) {
  return <div className={cn("my-1 h-[2px] bg-slate-100", className)} />;
}
