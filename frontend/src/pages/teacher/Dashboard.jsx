import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Mic, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api.get("/teacher/dashboard").then((r) => setData(r.data));
    Promise.all([api.get("/practices"), api.get("/quiz-results"), api.get("/stories")]).then(([p, q, s]) => {
      const map = Object.fromEntries(s.data.map((x) => [x.id, x.title]));
      const quizByStudentStory = {};
      q.data.forEach((x) => { quizByStudentStory[`${x.studentId}-${x.storyId}`] = Math.round((x.score / x.total) * 100); });
      const rows = p.data.slice(0, 8).map((x) => ({
        student: x.studentName,
        story: map[x.storyId] || "Story",
        reading: Math.round(((x.fluencyScore || 0) + (x.pronunciationScore || 0)) / 2),
        quiz: quizByStudentStory[`${x.studentId}-${x.storyId}`] ?? "—",
      }));
      setRecent(rows);
    });
  }, []);

  if (!data) return <Skeleton className="h-96 rounded-3xl" />;

  const cards = [
    { label: "Total Students", value: data.totalStudents, icon: Users, color: "bg-sky-500" },
    { label: "Stories Available", value: data.storiesAvailable, icon: BookOpen, color: "bg-violet-500" },
    { label: "Reading Practices", value: data.readingPractices, icon: Mic, color: "bg-green-500" },
    { label: "Average Quiz Score", value: `${data.avgQuizScore}%`, icon: Trophy, color: "bg-amber-400" },
  ];

  const chartData = data.students.map((s) => ({ name: s.name, reading: s.avgReading, quiz: s.avgQuiz }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Teacher Dashboard</h1>
        <p className="text-slate-500">Welcome, {user?.name} 👋</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" data-testid={`teacher-stat-${i}`}>\
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.color} text-white`}><Icon className="h-6 w-6" /></div>
              <div className="mt-3 font-heading text-3xl font-bold text-slate-800">{c.value}</div>
              <div className="text-sm font-semibold text-slate-400">{c.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Class Reading Progress</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontWeight: 700, fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
            <Bar dataKey="reading" name="Reading" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
            <Bar dataKey="quiz" name="Quiz" fill="#FBBF24" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Recent Student Activities</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead><TableHead>Story</TableHead>
                <TableHead>Reading Score</TableHead><TableHead>Quiz Score</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r, i) => (
                <TableRow key={i} data-testid={`recent-row-${i}`}>
                  <TableCell className="font-bold text-slate-700">{r.student}</TableCell>
                  <TableCell className="text-slate-500">{r.story}</TableCell>
                  <TableCell><span className="font-bold text-sky-600">{r.reading}%</span></TableCell>
                  <TableCell><span className="font-bold text-amber-600">{r.quiz === "—" ? "—" : `${r.quiz}%`}</span></TableCell>
                  <TableCell><Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge></TableCell>\
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
