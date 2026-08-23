import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";
  
  const variants = {
    default: "bg-sky-500 text-white hover:bg-sky-600 shadow-[0_4px_14px_rgba(14,165,233,0.2)]",
    destructive: "bg-rose-500 text-white hover:bg-rose-600",
    outline: "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    secondary: "bg-amber-400 text-slate-900 hover:bg-amber-300",
    ghost: "hover:bg-slate-100 hover:text-slate-700 text-slate-600",
    link: "text-sky-500 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-11 px-6 rounded-full",
    sm: "h-9 px-4 rounded-full text-xs",
    lg: "h-14 px-8 rounded-full text-base",
    icon: "h-10 w-10 rounded-full",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
