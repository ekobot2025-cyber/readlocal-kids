import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { StoryCard } from "@/components/StoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All Stories", 
  "Animals",
  "Culture",
  "Arts & Music",
  "Daily Life", 
  "Food", 
  "Nature", 
  "Environment",
  "Traditional House"
];
const GRADES = ["All Grades", "Grade 1-2", "Grade 3-4", "Grade 5-6"];

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All Stories");
  const [grade, setGrade] = useState("All Grades");

  useEffect(() => {
    api.get("/stories")
      .then((r) => setStories(r.data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filtered = stories.filter(
    (s) =>
      (cat === "All Stories" || s.category === cat) &&
      (grade === "All Grades" || s.grade === grade)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Story Library</h1>
        <p className="text-slate-500">Pick a story and start your reading adventure.</p>
      </div>

      {/* Category filter */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            data-testid={`filter-cat-${c.replace(/[^a-z]/gi, "-").toLowerCase()}`}
            className={cn(
              "whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors",
              cat === c ? "border-sky-500 bg-sky-500 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-200"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grade filter */}
      <div className="flex flex-wrap gap-2">
        {GRADES.map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g)}
            data-testid={`filter-grade-${g.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
              grade === g ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-500 hover:bg-amber-100"
            )}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-72 rounded-3xl" />)}
        </div>
      ) : filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>
      ) : (
        <p className="py-16 text-center font-bold text-slate-400">No stories match these filters yet.</p>
      )}
    </div>
  );
}
