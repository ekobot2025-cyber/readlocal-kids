import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenCheck, Mic, Trophy, Flame, ArrowRight, Play, Compass } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { StoryCard } from "@/components/StoryCard";
import { LevelBadge } from "@/components/LevelBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STAT_META = [
  { key: "stories", label: "Stories Completed", icon: BookOpenCheck, color: "bg-sky-500", tint: "bg-sky-50" },
  { key: "practices", label: "Reading Practice", icon: Mic, color: "bg-green-500", tint: "bg-green-50" },
  { key: "quiz", label: "Quiz Score", icon: Trophy, color: "bg-amber-400", tint: "bg-amber-50", suffix: "%" },
  { key: "streak", label: "Reading Streak", icon: Flame, color: "bg-rose-500", tint: "bg-rose-50", suffix: "d" },
];

export default function StudentHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [practices, setPractices] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/stories"), api.get("/practices"), api.get("/quiz-results")])
      .then(([s, p, q]) => {
        setStories(s.data);
        setPractices(p.data);
        setQuizzes(q.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const completedIds = [...new Set(practices.map((p) => p.storyId))];
  const avgQuiz = quizzes.length
    ? Math.round(quizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizzes.length)
    : 0;
  const stats = {
    stories: completedIds.length,
    practices: practices.length,
    quiz: avgQuiz,
    streak: Math.min(7, new Set(practices.map((p) => (p.date || "").slice(0, 10))).size) || 0,
  };

  const lastStory = practices.length ? stories.find((s) => s.id === practices[0].storyId) : null;
  const recommended = stories
    .filter((s) => !completedIds.includes(s.id))
    .filter((s) => s.level !== "Advanced")
    .slice(0, 3);
  const showList = recommended.length ? recommended : stories.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-br from-sky-500 to-sky-600 p-6 text-white md:flex-row md:items-center md:p-8">
        <div>
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">Hello, {user?.name}! 👋</h1>
          <p className="mt-1 text-sky-100">Ready to read today?</p>
        </div>
        <Button
          onClick={() => navigate("/app/stories")}
          data-testid="home-browse-stories"
          className="rounded-full bg-white px-6 py-6 font-bold text-sky-600 hover:bg-sky-50"
        >
          Browse Stories <ArrowRight className="ml-1.5 h-5 w-5" />
        </Button>
      </div>

      {/* Progress cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_META.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm"
              data-testid={`stat-${m.key}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${m.color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-3 font-heading text-3xl font-bold text-slate-800">
                {loading ? "—" : stats[m.key]}
                {m.suffix && !loading ? <span className="text-lg text-slate-400">{m.suffix}</span> : ""}
              </div>
              <div className="text-xs font-bold text-slate-400 mt-1">{m.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue reading */}
      {lastStory && (
        <div>
          <h2 className="mb-3 font-heading text-2xl font-bold text-slate-800">Continue Reading</h2>
          <div className="flex flex-col items-center gap-5 overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-4 shadow-sm sm:flex-row">
            <img src={lastStory.cover} alt={lastStory.title} className="h-40 w-full rounded-2xl object-cover sm:h-28 sm:w-44" />
            <div className="flex-1">
              <LevelBadge level={lastStory.level} />
              <h3 className="mt-2 font-heading text-xl font-bold text-slate-800">{lastStory.title}</h3>
              <p className="text-sm text-slate-400">{lastStory.category} · {lastStory.duration} min</p>
            </div>
            <Button
              onClick={() => navigate(`/app/story/${lastStory.id}`)}
              data-testid="continue-reading-btn"
              className="w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600 sm:w-auto sm:px-8"
            >
              <Play className="mr-1.5 h-4 w-4 fill-white" /> Continue
            </Button>
          </div>
        </div>
      )}

      {/* Recommended */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-slate-800">Recommended Stories</h2>
          <button onClick={() => navigate("/app/stories")} className="text-sm font-bold text-sky-500" data-testid="see-all-stories">
            See all
          </button>
        </div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-72 rounded-3xl" />)}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showList.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
          </div>
        )}
      </div>

      {/* Discover banner */}
      <button
        onClick={() => navigate("/app/discover")}
        data-testid="home-discover-banner"
        className="flex w-full items-center gap-4 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-left text-slate-900 shadow-sm transition-transform hover:-translate-y-1"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/40">
          <Compass className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-xl font-bold">Discover Papua</h3>
          <p className="text-sm text-amber-900/80">Explore Honai, Noken, Papeda and more in English.</p>
        </div>
        <ArrowRight className="h-6 w-6" />
      </button>
    </div>
  );
}
