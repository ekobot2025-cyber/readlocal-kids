import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = createContext(null);

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
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
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, selectedLabel, setSelectedLabel }}>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children, ...props }) {
  const { open, setOpen, selectedLabel } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none",
        className
      )}
      {...props}
    >
      <span>{selectedLabel || children}</span>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext);
  return <span>{value ? null : placeholder}</span>;
}

export function SelectContent({ className, children, ...props }) {
  const { open } = useContext(SelectContext);
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border-2 border-slate-100 bg-white p-1.5 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value: itemValue, children, className, ...props }) {
  const { value, onValueChange, setOpen, setSelectedLabel } = useContext(SelectContext);
  
  useEffect(() => {
    if (value === itemValue) {
      setSelectedLabel(children);
    }
  }, [value, itemValue, children, setSelectedLabel]);

  const handleSelect = () => {
    onValueChange(itemValue);
    setSelectedLabel(children);
    setOpen(false);
  };

  const isSelected = value === itemValue;

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600",
        isSelected && "bg-sky-50 text-sky-600",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-4 w-4 text-sky-500" />}
    </button>
  );
}
