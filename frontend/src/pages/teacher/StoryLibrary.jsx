import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Square, BookText, Eye } from "lucide-react";
import { api } from "@/lib/api";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { LevelBadge } from "@/components/LevelBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SPEED_OPTIONS = [
  { label: "Slow (0.7x)", rate: 0.7 },
  { label: "Normal (1.0x)", rate: 1.0 },
  { label: "Fast (1.3x)", rate: 1.3 },
];

export default function StoryLibrary() {
  const [stories, setStories] = useState([]);
  const [active, setActive] = useState(null);
  const [speedIndex, setSpeedIndex] = useState(1);
  const storyAudio = useStoryAudio();

  useEffect(() => { api.get("/stories").then((r) => setStories(r.data)); }, []);

  const open = (s) => { storyAudio.stop(); setActive(s); };

  const handleClose = () => {
    storyAudio.stop();
    setActive(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Story Library</h1>
        <p className="text-slate-500">Preview any story and listen to the model pronunciation.</p>
      </div>

      {!stories.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2,3].map((i)=><Skeleton key={i} className="h-64 rounded-3xl" />)}</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-indigo-50/50" data-testid={`tstory-${s.id}`}>
              <img src={s.cover} alt={s.title} className="h-36 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2"><LevelBadge level={s.level} /><span className="text-xs font-bold text-slate-400">{s.grade}</span></div>
                <h3 className="mt-2 font-heading text-lg font-bold text-slate-800">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.category} · {s.vocabulary.length} words</p>
                <Button onClick={() => open(s)} data-testid={`preview-${s.id}`} className="mt-3 w-full rounded-full bg-slate-900 font-bold text-white hover:bg-slate-850">
                  <Eye className="mr-1.5 h-4 w-4" /> Preview Story
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-3xl">
          {active && (
            <div data-testid="story-preview" className="p-6">
              <DialogTitle className="font-heading text-2xl font-bold text-slate-800 pr-8">{active.title}</DialogTitle>
              <div className="mt-1 flex items-center gap-2"><LevelBadge level={active.level} /><span className="text-sm text-slate-400">{active.category} · {active.grade}</span></div>

              {/* Story text */}
              <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-5 text-lg leading-relaxed text-slate-700">
                {active.text.map((l, i) => (
                  <p key={i}>
                    <span className={cn("transition-colors", storyAudio.activeIndex === i && "reading-active font-semibold text-sky-600 bg-sky-100 px-1 rounded")}>
                      {l}
                    </span>
                  </p>
                ))}
              </div>

              {/* Accent & Speed Selector */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100 p-3 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Accent:</span>
                  <div className="flex rounded-full bg-white p-1 border border-slate-200" data-testid="accent-selector">
                    <button
                      type="button"
                      onClick={() => storyAudio.setAccent("UK")}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all",
                        storyAudio.accent === "UK" ? "bg-amber-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      🇬🇧 UK
                    </button>
                    <button
                      type="button"
                      onClick={() => storyAudio.setAccent("US")}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all",
                        storyAudio.accent === "US" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      🇺🇸 US
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Speed:</span>
                  <div className="flex rounded-full bg-white p-1 border border-slate-200">
                    {SPEED_OPTIONS.map((opt, idx) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSpeedIndex(idx)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-bold transition-all",
                          speedIndex === idx ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                      >
                        {opt.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Listen / Stop button */}
              <Button
                onClick={() =>
                  storyAudio.speaking
                    ? storyAudio.stop()
                    : storyAudio.playSentences(active.id, active.text, SPEED_OPTIONS[speedIndex].rate)
                }
                data-testid="preview-listen"
                className={cn(
                  "mt-4 w-full sm:w-auto rounded-full py-5 font-bold text-white transition-colors",
                  storyAudio.speaking ? "bg-rose-500 hover:bg-rose-600" : "bg-sky-500 hover:bg-sky-600"
                )}
              >
                {storyAudio.speaking ? (
                  <><Square className="mr-1.5 h-4 w-4" /> Stop Audio</>
                ) : (
                  <><Volume2 className="mr-1.5 h-4 w-4" /> Listen to Model ({storyAudio.accent})</>
                )}
              </Button>

              <div className="mt-5">
                <h4 className="mb-2 flex items-center gap-1.5 font-bold text-slate-700"><BookText className="h-4 w-4" /> Vocabulary</h4>
                <div className="flex flex-wrap gap-2">
                  {active.vocabulary.map((v) => <span key={v.word} className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">{v.word}</span>)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
