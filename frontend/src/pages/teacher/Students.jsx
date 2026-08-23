import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, UserPlus, Loader2 } from "lucide-react";
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
          <motion.button
            key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }}
            onClick={() => navigate(`/teacher/student/${s.id}`)}
            data-testid={`student-card-${s.id}`}
            className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm w-full transition-transform"
          >
            <Avatar className="h-14 w-14 border-2 border-slate-100"><AvatarImage src={s.avatar} /><AvatarFallback>{s.name[0]}</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="font-heading text-lg font-bold text-slate-800">{s.name}</div>
              <div className="text-xs font-semibold text-slate-400">{s.grade}</div>
              <div className="mt-1 flex gap-3 text-xs font-bold">
                <span className="text-slate-500">Stories: {s.storiesCompleted}</span>
                <span className="text-sky-600">Avg. Reading: {s.avgReading}%</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </motion.button>
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
    </div>
  );
}
