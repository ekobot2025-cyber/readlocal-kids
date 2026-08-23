import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Trophy, Mic, Users, BookOpen } from "lucide-react";

export default function ClassProgress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/teacher/dashboard").then((r) => setData(r.data));
  }, []);

  if (!data) return <Skeleton className="h-96 rounded-3xl" />;

  const stats = [
    { label: "Active Students", value: data.totalStudents, icon: Users, color: "bg-sky-500" },
    { label: "Stories Available", value: data.storiesAvailable, icon: BookOpen, color: "bg-violet-500" },
    { label: "Reading Submissions", value: data.readingPractices, icon: Mic, color: "bg-green-500" },
    { label: "Class Quiz Average", value: `${data.avgQuizScore}%`, icon: Trophy, color: "bg-amber-400" },
  ];

  const chartData = data.students.map((s) => ({
    name: s.name,
    "Reading Score": s.avgReading,
    "Quiz Score": s.avgQuiz,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Class Progress</h1>
        <p className="text-slate-500">Overview of the class performance and reading habits.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${s.color} text-white`}><Icon className="h-5 w-5" /></div>
              <div className="mt-3 font-heading text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs font-semibold text-slate-400">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Reading vs Quiz Scores</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontWeight: 700, fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
            <Bar dataKey="Reading Score" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Quiz Score" fill="#FBBF24" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
