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

export default function StoryLibrary() {
  const [stories, setStories] = useState([]);
  const [active, setActive] = useState(null);
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
              <DialogTitle className="font-heading text-2xl font-bold text-slate-800">{active.title}</DialogTitle>
              <div className="mt-1 flex items-center gap-2"><LevelBadge level={active.level} /><span className="text-sm text-slate-400">{active.category} · {active.grade}</span></div>
              <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-5 text-lg leading-relaxed text-slate-700">
                {active.text.map((l, i) => (
                  <p key={i}>
                    <span className={cn("transition-colors", storyAudio.activeIndex === i && "reading-active font-semibold text-sky-600 bg-sky-100 px-1 rounded")}>
                      {l}
                    </span>
                  </p>
                ))}
              </div>
              <Button
                onClick={() => storyAudio.speaking ? storyAudio.stop() : storyAudio.playSentences(active.id, active.text, 1)}
                data-testid="preview-listen"
                className={cn(
                  "mt-4 rounded-full font-bold text-white transition-colors",
                  storyAudio.speaking ? "bg-rose-500 hover:bg-rose-600" : "bg-sky-500 hover:bg-sky-600"
                )}
              >
                {storyAudio.speaking ? <><Square className="mr-1.5 h-4 w-4" />Stop</> : <><Volume2 className="mr-1.5 h-4 w-4" />Listen to Model</>}
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
