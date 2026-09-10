import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, ArrowLeft, Loader2, UserPlus, LogIn } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { formatApiError } from "@/lib/api";
import { toast } from "sonner";

const HERO = "https://static.prod-images.emergentagent.com/jobs/22cefb94-57bb-4740-925f-65da674e47de/images/a7b0324a0584a89c20f2cb7ee1fc27401bd8b736185cb6658d491cc10928e172.jpeg";

export default function Login() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("Grade 4");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(user.role === "teacher" ? "/teacher" : "/app", { replace: true });
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isRegister && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const u = await register({
          name: name.trim(),
          username: username.trim(),
          password,
          role,
          grade: role === "student" ? grade : undefined,
        });
        toast.success(`Account created! Welcome, ${u.name}! 🎉`);
        navigate(u.role === "teacher" ? "/teacher" : "/app", { replace: true });
      } else {
        const u = await login(username.trim(), password);
        toast.success(`Welcome back, ${u.name}! 👋`);
        navigate(u.role === "teacher" ? "/teacher" : "/app", { replace: true });
      }
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || (isRegister ? "Registration failed" : "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left illustration (desktop) */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-br from-sky-500 to-sky-700 p-12 lg:flex">
        <div className="max-w-md text-white">
          <Logo size={44} textClass="text-white" />
          <img src={HERO} alt="Children reading" className="mt-8 w-full rounded-3xl border-4 border-white/20 shadow-2xl" />
          <h2 className="mt-8 font-heading text-3xl font-bold">Read English, Discover Local Culture</h2>
          <p className="mt-3 text-sky-100">Stories, reading practice, and games inspired by Papua — all in one friendly place.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex w-full flex-col justify-center px-6 py-10 lg:w-1/2 lg:px-16">
        <button
          onClick={() => navigate("/")}
          data-testid="back-home-btn"
          className="mb-8 flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>

        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Logo size={42} />
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold text-slate-800">
            {isRegister ? "Create Account ✨" : "Welcome back! 👋"}
          </h1>
          <p className="mt-1 text-slate-500">
            {isRegister
              ? "Join ReadLocal Kids to start reading."
              : "Log in to continue your reading adventure."}
          </p>

          {/* Role toggle */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setRole("student")}
              data-testid="role-student"
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors ${
                role === "student" ? "bg-white text-sky-600 shadow" : "text-slate-500"
              }`}
            >
              <User className="h-4 w-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              data-testid="role-teacher"
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors ${
                role === "teacher" ? "bg-white text-sky-600 shadow" : "text-slate-500"
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Teacher
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="fullname" className="font-bold text-slate-700">Full Name</Label>
                <Input
                  id="fullname"
                  data-testid="register-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Papuana"
                  className="mt-1.5 rounded-2xl border-2 py-6"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="username" className="font-bold text-slate-700">Username</Label>
              <Input
                id="username"
                data-testid="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. maria2026"
                className="mt-1.5 rounded-2xl border-2 py-6"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-bold text-slate-700">Password</Label>
              <Input
                id="password"
                type="password"
                data-testid="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 rounded-2xl border-2 py-6"
                autoComplete={isRegister ? "new-password" : "current-password"}
                required
              />
            </div>

            {isRegister && role === "student" && (
              <div>
                <Label htmlFor="grade" className="font-bold text-slate-700">Grade Level</Label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Grade 1-2">Grade 1-2 (Beginner)</option>
                  <option value="Grade 3-4">Grade 3-4 (Elementary)</option>
                  <option value="Grade 5-6">Grade 5-6 (Intermediate)</option>
                </select>
              </div>
            )}

            {error && (
              <p data-testid="login-error" className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              data-testid="login-submit"
              className="w-full rounded-full bg-sky-500 py-6 text-base font-bold text-white hover:bg-sky-600"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isRegister ? (
                <><UserPlus className="mr-2 h-5 w-5" /> Create Account</>
              ) : (
                <><LogIn className="mr-2 h-5 w-5" /> Log in</>
              )}
            </Button>
          </form>

          {/* Toggle between Register and Login */}
          <div className="mt-6 text-center text-sm font-semibold text-slate-500">
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setError(""); }}
                  className="font-bold text-sky-600 hover:underline"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(""); }}
                  className="font-bold text-sky-600 hover:underline"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
