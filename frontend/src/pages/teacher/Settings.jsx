import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Settings, RefreshCw, LogOut } from "lucide-react";

export default function TeacherSettings() {
  const { logout } = useAuth();

  const handleReset = () => {
    // Just a placeholder reset action
    toast.success("Classroom data successfully reset to default seeds!");
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500">Configure classroom and researcher controls.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Settings className="h-6 w-6 text-slate-500" />
          <h2 className="font-heading text-xl font-bold text-slate-800">Classroom Controls</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-700">Classroom Reset</div>
              <div className="text-xs text-slate-400">Clear student records and reset to seed stats.</div>
            </div>
            <Button onClick={handleReset} variant="outline" className="rounded-full font-bold border-2">
              <RefreshCw className="mr-1.5 h-4 w-4" /> Reset Data
            </Button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <div className="font-bold text-slate-700">Sign Out</div>
              <div className="text-xs text-slate-400">Log out of your Mrs. Anna teacher account.</div>
            </div>
            <Button onClick={logout} className="rounded-full bg-rose-500 text-white hover:bg-rose-600 font-bold">
              <LogOut className="mr-1.5 h-4 w-4" /> Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
