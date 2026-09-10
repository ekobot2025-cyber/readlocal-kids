import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Library, Users, Mic2, ClipboardCheck, TrendingUp,
  FlaskConical, BookMarked, Settings, LogOut, Menu,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, end: true, testid: "tnav-dashboard" },
  { to: "/teacher/stories", label: "Story Library", icon: Library, testid: "tnav-stories" },
  { to: "/teacher/students", label: "Students", icon: Users, testid: "tnav-students" },
  { to: "/teacher/reading", label: "Reading Results", icon: Mic2, testid: "tnav-reading" },
  { to: "/teacher/quiz", label: "Quiz Results", icon: ClipboardCheck, testid: "tnav-quiz" },
  { to: "/teacher/progress", label: "Progress", icon: TrendingUp, testid: "tnav-progress" },
  { to: "/teacher/evaluation", label: "Learning Evaluation", icon: FlaskConical, testid: "tnav-evaluation" },
  { to: "/teacher/guide", label: "Teacher Guide", icon: BookMarked, testid: "tnav-guide" },
  { to: "/teacher/settings", label: "Settings", icon: Settings, testid: "tnav-settings" },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1.5">
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            data-testid={item.testid}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function TeacherLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-4 lg:flex">
        <button onClick={() => navigate("/teacher")} className="mb-6 px-1">
          <Logo size={38} />
        </button>
        <NavItems />
        <div className="mt-auto rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-slate-800">{user?.name}</div>
              <div className="text-xs text-slate-400">Teacher</div>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            data-testid="teacher-logout"
            className="mt-2 w-full justify-start rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="teacher-menu-btn" className="rounded-xl">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-4">
            <button onClick={() => { navigate("/teacher"); setOpen(false); }} className="mb-6 block">
              <Logo size={36} />
            </button>
            <NavItems onNavigate={() => setOpen(false)} />
            <Button
              onClick={logout}
              variant="ghost"
              data-testid="teacher-logout-mobile"
              className="mt-4 w-full justify-start rounded-xl text-rose-600"
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </Button>
          </SheetContent>
        </Sheet>
        <Logo size={34} />
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </header>

      <main className="min-h-[calc(100vh-65px)] flex flex-col justify-between px-4 py-6 md:px-8 lg:ml-64 lg:px-10 lg:py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
        <div className="mt-12">
          <Footer showLogo={false} />
        </div>
      </main>
    </div>
  );
}
