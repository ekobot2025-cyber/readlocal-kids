import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

export function Tabs({ children, value: controlledValue, defaultValue, onValueChange, className, ...props }) {
  const [localValue, setLocalValue] = useState(controlledValue || defaultValue);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setLocalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleValueChange = (newValue) => {
    if (controlledValue === undefined) {
      setLocalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: localValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-2xl bg-slate-100 p-1 text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ className, value: triggerValue, children, ...props }) {
  const { value, onValueChange } = useContext(TabsContext);
  const isActive = value === triggerValue;
  return (
    <button
      type="button"
      onClick={() => onValueChange && onValueChange(triggerValue)}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
        isActive
          ? "bg-white text-sky-600 shadow-sm"
          : "text-slate-500 hover:text-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value: contentValue, children, ...props }) {
  const { value } = useContext(TabsContext);
  if (value !== contentValue) return null;
  return (
    <div
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
