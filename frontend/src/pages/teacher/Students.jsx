import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, UserPlus, Loader2, KeyRound } from "lucide-react";
import { api, formatApiError } from "@/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

export default function Students() {
  const [students, setStudents] = useState(null);
  const [open, setOpen] = useState(false);
  
  // Registration form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("Grade 4");
  const [saving, setSaving] = useState(false);

  // Reset Password states
  const [resetModalStudent, setResetModalStudent] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  const navigate = useNavigate();

  const load = () => {
    api.get("/students")
      .then((r) => setStudents(r.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    load();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) {
      return toast.error("Please fill in all fields.");
    }
    setSaving(true);
    try {
      await api.post("/students", {
        name: name.trim(),
        username: username.trim().toLowerCase(),
        password,
        grade,
      });
      toast.success("Student registered successfully! 🎒");
      setName("");
      setUsername("");
      setPassword("");
      setOpen(false);
      load(); // Refresh student list
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Registration failed");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetModalStudent) return;
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      return toast.error("Password must be at least 4 characters long.");
    }
    setResetting(true);
    try {
      await api.put(`/students/${resetModalStudent.id}/password`, {
        new_password: newPassword.trim(),
      });
      toast.success(`Password for ${resetModalStudent.name} successfully updated! 🔑`);
      setResetModalStudent(null);
      setNewPassword("");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed to reset password.");
    } finally {
      setResetting(false);
    }
  };

  if (!students) return <div className="space-y-3">{[0,1,2,3].map((i)=><Skeleton key={i} className="h-20 rounded-3xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-800">Students</h1>
          <p className="text-slate-500">{students.length} students in your class.</p>
        </div>
        <Button onClick={() => setOpen(true)} data-testid="add-student-btn" className="rounded-full bg-sky-500 font-bold text-white hover:bg-sky-600">
          <UserPlus className="mr-1.5 h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {students.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            data-testid={`student-card-${s.id}`}
            className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm w-full transition-transform hover:shadow-md"
          >
            <div
              onClick={() => navigate(`/teacher/student/${s.id}`)}
              className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer text-left"
            >
              <Avatar className="h-14 w-14 border-2 border-slate-100 flex-shrink-0">
                <AvatarImage src={s.avatar} />
                <AvatarFallback>{s.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-heading text-lg font-bold text-slate-800 truncate">{s.name}</div>
                <div className="text-xs font-semibold text-slate-400">@{s.username || s.id} · {s.grade}</div>
                <div className="mt-1 flex gap-3 text-xs font-bold">
                  <span className="text-slate-500">Stories: {s.storiesCompleted}</span>
                  <span className="text-sky-600">Avg: {s.avgReading}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setResetModalStudent(s);
                  setNewPassword("123456");
                }}
                title="Reset Kata Sandi Siswa"
                data-testid={`reset-pass-${s.id}`}
                className="rounded-2xl border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600 hover:text-amber-700 font-bold text-xs h-9 px-3 gap-1.5"
              >
                <KeyRound className="h-3.5 w-3.5 text-amber-500" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <button
                type="button"
                onClick={() => navigate(`/teacher/student/${s.id}`)}
                className="p-1.5 text-slate-300 hover:text-slate-600 cursor-pointer"
                aria-label="View Student"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Registration Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogTitle className="font-heading text-2xl font-bold text-slate-800 mb-4">Register New Student</DialogTitle>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="reg-name" className="font-bold text-slate-700">Full Name</Label>
              <Input
                id="reg-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Samuel Papua"
                className="mt-1.5 rounded-2xl border-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="reg-username" className="font-bold text-slate-700">Username</Label>
              <Input
                id="reg-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. samuel"
                className="mt-1.5 rounded-2xl border-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="reg-password" className="font-bold text-slate-700">Password</Label>
              <Input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 rounded-2xl border-2"
                required
              />
            </div>
            <div>
              <Label className="font-bold text-slate-700">Grade Level</Label>
              <div className="mt-1.5">
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="rounded-2xl border-2"><SelectValue placeholder="Select Grade" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 1-2">Grade 1-2</SelectItem>
                    <SelectItem value="Grade 3-4">Grade 3-4</SelectItem>
                    <SelectItem value="Grade 5-6">Grade 5-6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-sky-500 py-6 text-base font-bold text-white hover:bg-sky-600 mt-2"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Register Student"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetModalStudent} onOpenChange={(isOpen) => !isOpen && setResetModalStudent(null)}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <KeyRound className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="font-heading text-xl font-bold text-slate-800">
                Reset Kata Sandi Siswa
              </DialogTitle>
              <p className="text-xs text-slate-400">
                {resetModalStudent?.name} (@{resetModalStudent?.username || resetModalStudent?.id})
              </p>
            </div>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="new-pass" className="font-bold text-slate-700">Password Baru / New Password</Label>
              <Input
                id="new-pass"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 4 karakter"
                className="mt-1.5 rounded-2xl border-2 font-mono text-base"
                required
              />
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-slate-400">Minimal 4 karakter.</p>
                <button
                  type="button"
                  onClick={() => setNewPassword("123456")}
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  ⚡ Set Default: 123456
                </button>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResetModalStudent(null)}
                className="w-1/2 rounded-full py-5 text-sm font-bold border-2"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={resetting}
                className="w-1/2 rounded-full bg-amber-500 hover:bg-amber-600 text-white py-5 text-sm font-bold shadow-md"
              >
                {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Sandi"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
