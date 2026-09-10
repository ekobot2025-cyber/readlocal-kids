import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Mic, Trophy, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const BADGES = [
  { id: "bronze", label: "Beginner Reader", emoji: "🥉", need: (s) => s.stories >= 1 },
  { id: "silver", label: "Active Reader", emoji: "🥈", need: (s) => s.stories >= 3 },
  { id: "gold", label: "Great Reader", emoji: "🥇", need: (s) => s.stories >= 5 },
  { id: "champ", label: "Reading Champion", emoji: "🏆", need: (s) => s.stories >= 8 },
  { id: "vocab", label: "Vocabulary Star", emoji: "🌟", need: (s) => s.practices >= 5 },
  { id: "pron", label: "Pronunciation Star", emoji: "🎤", need: (s) => s.avgQuiz >= 80 },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StudentProgress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/stories"), api.get("/practices"), api.get("/quiz-results")]).then(([s, p, q]) => {
      const practices = p.data, quizzes = q.data, stories = s.data;
      const storyMap = Object.fromEntries(stories.map((x) => [x.id, x.title]));
      const completed = [...new Set(practices.map((x) => x.storyId))];
      const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, x) => a + (x.score / x.total) * 100, 0) / quizzes.length) : 0;
      const readingTime = Math.round(practices.reduce((a, x) => a + (x.duration || 0), 0) / 60) || 0;

      const week = DAYS.map((d) => ({ day: d, sessions: 0 }));
      practices.forEach((x) => { const wd = new Date(x.date).getDay(); if (!isNaN(wd)) week[wd].sessions += 1; });

      const recent = practices.slice(0, 6).map((x) => ({
        title: storyMap[x.storyId] || "Story",
        score: Math.round(((x.fluencyScore || 0) + (x.pronunciationScore || 0)) / 2),
        date: x.date,
      }));

      setData({
        stories: completed.length, practices: practices.length, avgQuiz, readingTime, week, recent,
      });
    })
    .catch((e) => console.error(e));
  }, []);

  if (!data) return <Skeleton className="h-96 rounded-3xl" />;

  const stats = [
    { label: "Stories Completed", value: data.stories, icon: BookOpenCheck, color: "bg-sky-500" },
    { label: "Reading Practices", value: data.practices, icon: Mic, color: "bg-green-500" },
    { label: "Average Quiz", value: `${data.avgQuiz}%`, icon: Trophy, color: "bg-amber-400" },
    { label: "Reading Time", value: `${data.readingTime} min`, icon: Clock, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-slate-800">My Reading Progress</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.color} text-white`}><Icon className="h-6 w-6" /></div>
              <div className="mt-3 font-heading text-3xl font-bold text-slate-800">{s.value}</div>
              <div className="text-sm font-semibold text-slate-400">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly chart */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-6">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Weekly Reading Activity</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.week}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontWeight: 700, fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#f0f9ff" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
            <Bar dataKey="sessions" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Achievements</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((b) => {
            const earned = b.need(data);
            return (
              <motion.div key={b.id} whileHover={{ scale: earned ? 1.05 : 1 }} data-testid={`badge-${b.id}`} className={`flex flex-col items-center gap-2 rounded-3xl border-2 p-4 text-center ${earned ? "border-amber-200 bg-amber-50" : "border-slate-100 bg-slate-50 opacity-50 grayscale"}`}>
                <span className="text-4xl">{b.emoji}</span>
                <span className="text-xs font-bold text-slate-700">{b.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent activity & Certificate */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading text-xl font-bold text-slate-800">Recent Activity</h2>
          <div className="space-y-2">
            {data.recent.length ? data.recent.map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white px-4 py-3" data-testid={`recent-activity-${i}`}>
                <div>
                  <div className="font-bold text-slate-800">{r.title}</div>
                  <div className="text-xs font-semibold text-green-600">Completed</div>
                </div>
                <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-600">Score {r.score}%</div>
              </div>
            )) : <p className="text-sm text-slate-400">No activity yet. Start reading a story!</p>}
          </div>
        </div>

        {/* Certificate Card */}
        <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex flex-col justify-between text-center shadow-sm">
          <div>
            <span className="text-4xl">📜</span>
            <h3 className="mt-2 font-heading text-xl font-bold text-amber-900">Certificate of Accomplishment</h3>
            <p className="mt-2 text-xs font-semibold text-amber-800/80">
              Celebrate your Papuan Reading Aloud journey with an official certificate!
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="mt-6 w-full rounded-full bg-amber-500 py-3 font-bold text-white hover:bg-amber-600 shadow-md transition-all cursor-pointer"
          >
            🎓 Print / Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
