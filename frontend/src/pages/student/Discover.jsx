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

      <Dialog open={!!active} onOpenChange={(o) => { if (!o) { speech.stop(); setActive(null); } }}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden">
          {active && (
            <div data-testid="culture-detail">
              <img src={active.image} alt={active.name} className="h-52 w-full object-cover" />
              <div className="space-y-4 p-6">
                <DialogTitle className="font-heading text-2xl font-bold text-slate-800">{active.name}</DialogTitle>
                <div className="rounded-2xl bg-sky-50 p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-sky-500">English</span>
                    <Button onClick={() => speech.speak(active.en, 0.9)} size="sm" variant="outline" data-testid="culture-listen-btn" className="h-7 rounded-full border-2 text-xs font-bold text-sky-600">
                      <Volume2 className="mr-1 h-3.5 w-3.5" /> Listen
                    </Button>
                  </div>
                  <p className="text-slate-700">{active.en}</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <span className="text-xs font-bold uppercase text-amber-500">Bahasa Indonesia</span>
                  <p className="mt-1 text-slate-700">{active.id_text}</p>
                </div>
                <Button onClick={() => navigate(`/app/story/${active.story}`)} data-testid="culture-story-btn" className="w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600">
                  <BookOpen className="mr-1.5 h-5 w-5" /> Read the Related Story
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
