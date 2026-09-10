import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Mic, Gamepad2, BarChart3, LogOut, Compass, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NAV = [
  { to: "/app", label: "Home", icon: Home, end: true, testid: "nav-home" },
  { to: "/app/stories", label: "Stories", icon: BookOpen, testid: "nav-stories" },
  { to: "/app/practice", label: "Practice", icon: Mic, testid: "nav-practice" },
  { to: "/app/games", label: "Games", icon: Gamepad2, testid: "nav-games" },
  { to: "/app/progress", label: "Progress", icon: BarChart3, testid: "nav-progress" },
];

export function StudentLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 px-4 py-3 backdrop-blur-md md:px-8">
        <button onClick={() => navigate("/app")} data-testid="topbar-logo">
          <Logo size={38} />
        </button>
        <ProfileMenu user={user} logout={logout} navigate={navigate} />
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-60 shrink-0 flex-col gap-2 border-r border-slate-100 p-4 md:flex">
          {NAV.map((item) => (
            <SideLink key={item.to} item={item} />
          ))}
          <SideLink item={{ to: "/app/discover", label: "Discover Papua", icon: Compass, testid: "nav-discover" }} />
        </aside>

        {/* Main */}
        <main className="min-h-[calc(100vh-65px)] flex-1 flex flex-col justify-between px-4 pb-28 pt-6 md:px-8 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
          <div className="mt-12">
            <Footer showLogo={false} />
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-100 bg-white/95 px-2 py-2 backdrop-blur-md md:hidden">
        {NAV.map((item) => (
          <BottomLink key={item.to} item={item} />
        ))}
      </nav>
    </div>
  );
}

function SideLink({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      data-testid={item.testid}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
          isActive ? "bg-sky-500 text-white shadow-[0_6px_16px_rgba(14,165,233,0.3)]" : "text-slate-600 hover:bg-sky-50"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {item.label}
    </NavLink>
  );
}

function BottomLink({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      data-testid={`${item.testid}-mobile`}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[11px] font-bold transition-colors ${
          isActive ? "text-sky-500" : "text-slate-400"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`rounded-full p-1.5 ${isActive ? "bg-sky-100" : ""}`}>
            <Icon className="h-5 w-5" />
          </span>
          {item.label}
        </>
      )}
    </NavLink>
  );
}

function ProfileMenu({ user, logout, navigate }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-testid="profile-menu-trigger"
          className="flex items-center gap-2 rounded-full border-2 border-slate-100 py-1 pl-1 pr-3 transition-colors hover:bg-slate-55"
        >
          <Avatar className="h-8 w-8 bg-sky-100">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-bold text-slate-700 sm:inline">{user?.name}</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-2xl">
        <DropdownMenuItem onClick={() => navigate("/app/discover")} data-testid="menu-discover">
          <Compass className="mr-2 h-4 w-4" /> Discover Papua
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} data-testid="menu-logout" className="text-rose-600">
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
