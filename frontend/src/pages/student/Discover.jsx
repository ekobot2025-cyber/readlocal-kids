import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, BookOpen } from "lucide-react";
import { api } from "@/lib/api";
import { useSpeech } from "@/hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function Discover() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const speech = useSpeech();
  const navigate = useNavigate();

  useEffect(() => { api.get("/culture").then((r) => setItems(r.data)); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Discover Papua 🌴</h1>
        <p className="text-slate-500">Tap a card to learn about Papua's culture in English.</p>
      </div>

      {!items.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2,3,4,5].map((i)=><Skeleton key={i} className="h-56 rounded-3xl" />)}</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.button
              key={it.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setActive(it)}
              data-testid={`culture-card-${it.id}`}
              className="overflow-hidden rounded-3xl border-2 border-slate-100 bg-white text-left shadow-sm"
            >
              <img src={it.image} alt={it.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-slate-800">{it.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">{it.en}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => { if (!o) { speech.stop(); setActive(null); } }} maxWidth="max-w-xl">
        <DialogContent className="w-full p-0 overflow-hidden">
          {active && (
            <div data-testid="culture-detail" className="w-full">
              {/* Header Image with Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase text-slate-900 shadow-sm">
                    Culture of Papua 🌴
                  </span>
                  <DialogTitle className="mt-1 font-heading text-3xl font-extrabold text-white drop-shadow-md">
                    {active.name}
                  </DialogTitle>
                </div>
              </div>

              {/* Body Details */}
              <div className="space-y-4 p-6 bg-white">
                <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/70 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-black tracking-wider uppercase text-sky-600">🇬🇧 English Description</span>
                    <Button
                      onClick={() => speech.speak(active.en, 0.9)}
                      size="sm"
                      variant="outline"
                      data-testid="culture-listen-btn"
                      className="h-8 rounded-full border-sky-300 bg-white px-3 text-xs font-bold text-sky-600 shadow-sm hover:bg-sky-500 hover:text-white transition-all"
                    >
                      <Volume2 className="mr-1.5 h-3.5 w-3.5" /> Listen
                    </Button>
                  </div>
                  <p className="text-base font-medium leading-relaxed text-slate-700">{active.en}</p>
                </div>

                <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/70 p-4 shadow-sm">
                  <span className="mb-1.5 block text-xs font-black tracking-wider uppercase text-amber-600">🇮🇩 Bahasa Indonesia</span>
                  <p className="text-base font-medium leading-relaxed text-slate-700">{active.id_text}</p>
                </div>

                <Button
                  onClick={() => {
                    speech.stop();
                    setActive(null);
                    navigate(`/app/story/${active.story}`);
                  }}
                  data-testid="culture-story-btn"
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 py-6 text-base font-bold text-white shadow-lg hover:from-sky-600 hover:to-indigo-700 transition-all"
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Read the Related Story
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
