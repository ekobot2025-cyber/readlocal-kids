import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookText, Sparkles, Play } from "lucide-react";
import { LevelBadge } from "@/components/LevelBadge";
import { Button } from "@/components/ui/button";

export function StoryCard({ story, index = 0 }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      data-testid={`story-card-${story.id}`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={story.cover}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <LevelBadge level={story.level} />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-slate-600 backdrop-blur">
          {story.grade}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-500">{story.category}</span>
        <h3 className="mt-1 font-heading text-lg font-bold text-slate-800">{story.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {story.duration} min</span>
          <span className="flex items-center gap-1"><BookText className="h-3.5 w-3.5" /> {story.vocabulary?.length || 0} words</span>
          <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> {story.text?.length || 0} lines</span>
        </div>
        <Button
          onClick={() => navigate(`/app/story/${story.id}`)}
          data-testid={`start-reading-${story.id}`}
          className="mt-4 w-full rounded-full bg-sky-500 py-5 font-bold text-white hover:bg-sky-600"
        >
          <Play className="mr-1.5 h-4 w-4 fill-white" /> Start Reading
        </Button>
      </div>
    </motion.div>
  );
}
