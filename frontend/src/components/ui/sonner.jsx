import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-800 group-[.toaster]:border-slate-100 group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl font-bold",
          description: "group-[.toast]:text-slate-500",
          actionButton:
            "group-[.toast]:bg-sky-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
