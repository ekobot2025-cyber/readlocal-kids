import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Puzzle, ListOrdered, HelpCircle, RotateCcw, CheckCircle2, Trophy, X } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Games() {
  const [culture, setCulture] = useState([]);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    api.get("/culture").then((r) => setCulture(r.data));
    api.get("/stories").then((r) => {
      const s = [];
      r.data.forEach((st) => st.text.forEach((line) => {
        const words = line.replace(/[.,]/g, "").split(" ");
        if (words.length >= 4 && words.length <= 7) s.push(line.replace(/\.$/, ""));
      }));
      setSentences(shuffle(s).slice(0, 8));
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Learning Games</h1>
        <p className="text-slate-500">Play and learn English the fun way!</p>
      </div>
      <Tabs defaultValue="match">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1.5">
          <TabsTrigger value="match" data-testid="game-tab-match" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600"><Puzzle className="mr-1.5 h-4 w-4" />Match</TabsTrigger>
          <TabsTrigger value="arrange" data-testid="game-tab-arrange" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600"><ListOrdered className="mr-1.5 h-4 w-4" />Arrange</TabsTrigger>
          <TabsTrigger value="missing" data-testid="game-tab-missing" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600"><HelpCircle className="mr-1.5 h-4 w-4" />Missing</TabsTrigger>
        </TabsList>
        <TabsContent value="match" className="mt-6"><MatchGame items={culture} /></TabsContent>
        <TabsContent value="arrange" className="mt-6"><ArrangeGame sentences={sentences} /></TabsContent>
        <TabsContent value="missing" className="mt-6"><MissingGame /></TabsContent>
      </Tabs>
    </div>
  );
}

/* Game 1: Match the Picture */
function MatchGame({ items }) {
  const round = items.slice(0, 4);
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (round.length > 0) {
      setWords(shuffle(round));
    }
  }, [items]); // eslint-disable-line

  useEffect(() => { setMatched([]); setSelected(null); }, [items]);

  if (!round.length) return <p className="text-center text-slate-400">Loading...</p>;

  const clickImage = (id) => {
    if (matched.includes(id)) return;
    if (selected === id) {
      setMatched((m) => [...m, id]);
      setSelected(null);
      if (matched.length + 1 === round.length) toast.success("All matched! 🎉");
    } else if (selected) {
      toast.error("Not a match, try again!");
      setSelected(null);
    }
  };

  const won = matched.length === round.length;

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-6" data-testid="match-game">
      <p className="mb-4 text-center font-semibold text-slate-500">Tap a word, then tap its picture.</p>
      {won && <div className="mb-4 rounded-2xl bg-green-50 p-3 text-center font-bold text-green-700"><Trophy className="mr-1 inline h-5 w-5" />You matched them all!</div>}\
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {words.map((w) => (
          <button
            key={w.id}
            onClick={() => !matched.includes(w.id) && setSelected(w.id)}
            disabled={matched.includes(w.id)}
            data-testid={`match-word-${w.id}`}
            className={cn("rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors",
              matched.includes(w.id) ? "border-green-300 bg-green-100 text-green-600 line-through" :
              selected === w.id ? "border-sky-500 bg-sky-500 text-white" : "border-slate-200 text-slate-600 hover:border-sky-300")}
          >\
            {w.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {round.map((it) => (
          <button key={it.id} onClick={() => clickImage(it.id)} data-testid={`match-img-${it.id}`}
            className={cn("relative overflow-hidden rounded-2xl border-2 transition-transform hover:-translate-y-1",
              matched.includes(it.id) ? "border-green-400" : "border-slate-100")}>
            <img src={it.image} alt="" className="h-24 w-full object-cover sm:h-28" />
            {matched.includes(it.id) && <div className="absolute inset-0 flex items-center justify-center bg-green-500/40"><CheckCircle2 className="h-8 w-8 text-white" /></div>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Game 2: Arrange the Sentence */
function ArrangeGame({ sentences }) {
  const [idx, setIdx] = useState(0);
  const target = sentences[idx];
  const correct = target ? target.split(" ") : [];
  const [pool, setPool] = useState([]);
  const [built, setBuilt] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (target) { setPool(shuffle(correct.map((w, i) => ({ w, i })))); setBuilt([]); setStatus(null); }
  }, [target]); // eslint-disable-line

  if (!target) return <p className="text-center text-slate-400">Loading...</p>;

  const pick = (item) => { setBuilt((b) => [...b, item]); setPool((p) => p.filter((x) => x !== item)); setStatus(null); };
  const unpick = (item) => { setPool((p) => [...p, item]); setBuilt((b) => b.filter((x) => x !== item)); setStatus(null); };
  const check = () => {
    const ok = built.map((x) => x.w).join(" ") === correct.join(" ");
    setStatus(ok ? "correct" : "wrong");
    if (ok) toast.success("Correct sentence! 🎉");
  };
  const nextS = () => setIdx((v) => (v + 1) % sentences.length);

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-6" data-testid="arrange-game">
      <p className="mb-4 text-center font-semibold text-slate-500">Tap the words in the right order.</p>
      <div className="mb-4 min-h-[64px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap gap-2">
          {built.map((item, k) => (
            <button key={k} onClick={() => unpick(item)} data-testid={`arrange-built-${k}`} className="rounded-full bg-sky-500 px-3.5 py-1.5 text-sm font-bold text-white">{item.w}</button>
          ))}
          {!built.length && <span className="text-sm text-slate-400">Your sentence appears here...</span>}
        </div>
      </div>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {pool.map((item, k) => (
          <button key={k} onClick={() => pick(item)} data-testid={`arrange-pool-${k}`} className="rounded-full border-2 border-slate-200 px-3.5 py-1.5 text-sm font-bold text-slate-600 hover:border-sky-300">{item.w}</button>
        ))}
      </div>
      {status === "correct" && <p className="mb-3 rounded-xl bg-green-50 py-2 text-center font-bold text-green-700">✅ "{correct.join(" ")}"</p>}
      {status === "wrong" && <p className="mb-3 rounded-xl bg-rose-50 py-2 text-center font-bold text-rose-600">Not quite — try again!</p>}
      <div className="flex gap-3">
        <Button onClick={check} disabled={built.length !== correct.length} data-testid="arrange-check" className="flex-1 rounded-full bg-green-500 py-6 font-bold text-white hover:bg-green-600">Check</Button>\
        <Button onClick={nextS} variant="outline" data-testid="arrange-next" className="rounded-full border-2 py-6 font-bold"><RotateCcw className="mr-1.5 h-4 w-4" />Next</Button>\
      </div>
    </div>
  );
}

/* Game 3: Missing Word */
const MISSING = [
  { sentence: "The bird lives in ______.", options: ["Papua", "Bali", "Jakarta"], answer: 0 },
  { sentence: "A Honai roof is made of ______.", options: ["Metal", "Grass", "Glass"], answer: 1 },
  { sentence: "Papeda is made from ______.", options: ["Sago", "Rice", "Corn"], answer: 0 },
  { sentence: "We play the ______ at festivals.", options: ["Piano", "Tifa", "Violin"], answer: 1 },
  { sentence: "The Noken is carried on the ______.", options: ["Head", "Foot", "Car"], answer: 0 },
];

function MissingGame() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const q = MISSING[idx];

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) { setScore((s) => s + 1); toast.success("Correct! 🎉"); }
  };
  const next = () => { setSelected(null); setIdx((v) => (v + 1) % MISSING.length); };

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-6 text-center" data-testid="missing-game">
      <div className="mb-2 text-sm font-bold text-slate-400">Round {idx + 1} of {MISSING.length} · Score {score}</div>
      <h3 className="mb-6 font-heading text-2xl font-bold text-slate-800">{q.sentence}</h3>
      <div className="mx-auto grid max-w-sm gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer, isChosen = i === selected;
          let style = "border-slate-200 hover:border-sky-300";
          if (selected !== null) { if (isCorrect) style = "border-green-400 bg-green-50"; else if (isChosen) style = "border-rose-400 bg-rose-50"; else style = "opacity-60"; }
          return (
            <button key={i} onClick={() => choose(i)} data-testid={`missing-option-${i}`} className={cn("flex items-center justify-between rounded-2xl border-2 px-4 py-4 font-bold text-slate-700 transition-colors", style)}>
              {opt}
              {selected !== null && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {selected !== null && isChosen && !isCorrect && <X className="h-5 w-5 text-rose-500" />}
            </button>
          );
        })}
      </div>
      <Button onClick={next} disabled={selected === null} data-testid="missing-next" className="mt-5 rounded-full bg-sky-500 px-8 py-6 font-bold text-white hover:bg-sky-600">Next</Button>\
    </div>
  );
}
