import React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <table className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({ className, children, ...props }) {
  return (
    <thead className={cn("[&_tr]:border-b border-slate-200 bg-slate-50", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }) {
  return (
    <tr
      className={cn(
        "border-b border-slate-100 transition-colors hover:bg-slate-50",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle font-bold text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }) {
  return (
    <td
      className={cn("p-4 align-middle text-slate-700", className)}
      {...props}
    >
      {children}
    </td>
  );
}
