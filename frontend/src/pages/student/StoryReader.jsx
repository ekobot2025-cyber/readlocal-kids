import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Mic, Square, RotateCcw, Play, Save, ArrowLeft, Loader2,
  ChevronLeft, ChevronRight, Sparkles, CheckCircle2, XCircle, Star, BookText,
} from "lucide-react";
import { api } from "@/lib/api";
import { useSpeech } from "@/hooks/useSpeech";
import { useRecorder } from "@/hooks/useRecorder";
import { LevelBadge } from "@/components/LevelBadge";
import { ScoreStars } from "@/components/ScoreStars";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SPEED = { 0: { label: "Slow", rate: 0.7 }, 1: { label: "Normal", rate: 1 }, 2: { label: "Fast", rate: 1.25 } };

export default function StoryReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("read");

  useEffect(() => {
    api.get(`/stories/${id}`).then((r) => setStory(r.data)).catch(() => navigate("/app/stories")).finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Skeleton className="h-96 rounded-3xl" />;
  if (!story) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate(-1)} data-testid="reader-back" className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-slate-600">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center gap-4">
        <img src={story.cover} alt={story.title} className="h-20 w-20 rounded-2xl object-cover shadow" />
        <div>
          <LevelBadge level={story.level} />
          <h1 className="mt-1 font-heading text-3xl font-bold text-slate-800">{story.title}</h1>
          <p className="text-sm text-slate-400">{story.category} · {story.grade}</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1.5">
          <TabsTrigger value="read" data-testid="tab-read" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600">Read Aloud</TabsTrigger>
          <TabsTrigger value="vocab" data-testid="tab-vocab" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600">Learn Words</TabsTrigger>
          <TabsTrigger value="quiz" data-testid="tab-quiz" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="mt-6">
          <ReadingMode story={story} onGoQuiz={() => setTab("quiz")} />
        </TabsContent>
        <TabsContent value="vocab" className="mt-6">
          <VocabularyMode story={story} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <QuizMode story={story} onRestart={() => navigate("/app/stories")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------------- Reading Mode ---------------- */
function ReadingMode({ story, onGoQuiz }) {
  const speech = useSpeech();
  const rec = useRecorder();
  const [speed, setSpeed] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  const listen = () => {
    if (speech.speaking) return speech.stop();
    speech.speakSequence(story.text, SPEED[speed].rate);
  };

  const savePractice = async () => {
    setSaving(true);
    const fluency = 78 + Math.floor(Math.random() * 15);
    const pronunciation = 76 + Math.floor(Math.random() * 16);
    const confidence = 84 + Math.floor(Math.random() * 13);
    const scores = { fluency, pronunciation, confidence, completion: 100 };
    try {
      const recording = await rec.getBase64();
      await api.post("/practices", {
        storyId: story.id,
        duration: rec.seconds,
        attempt: 1,
        recording: recording && recording.length < 700000 ? recording : null,
        fluencyScore: fluency,
        pronunciationScore: pronunciation,
        confidenceScore: confidence,
        completionScore: 100,
      });
      setFeedback(scores);
      toast.success("Practice saved! 🌟");
    } catch (err) {
      console.error(err);
      toast.error("Could not save practice.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {!speech.supported && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
          Listen (Text-to-Speech) is not supported on this browser.
        </p>
      )}

      {/* Story text */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-6 md:p-8" data-testid="story-text">
        <div className="space-y-4 text-xl leading-loose text-slate-700 md:text-2xl">
          {story.text.map((line, i) => (
            <p key={i}>
              <span className={cn("transition-colors", speech.activeIndex === i && "reading-active font-semibold text-slate-900")}>
                {line}
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* Reading speed & Accent Selector */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">Audio Accent:</span>
            <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200" data-testid="accent-selector">
              <button
                type="button"
                onClick={() => speech.setAccent("UK")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all",
                  speech.accent === "UK" ? "bg-amber-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                )}
              >
                🇬🇧 UK (British)
              </button>
              <button
                type="button"
                onClick={() => speech.setAccent("US")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all",
                  speech.accent === "US" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                )}
              >
                🇺🇸 US (American)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">Speed</span>
            <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-bold text-sky-600">{SPEED[speed].label}</span>
          </div>
        </div>

        <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={0} max={2} step={1} data-testid="speed-slider" />
        <div className="mt-1 flex justify-between text-xs font-semibold text-slate-400">
          <span>Slow</span><span>Normal</span><span>Fast</span>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Button onClick={listen} data-testid="listen-btn" className={cn("rounded-full py-6 text-base font-bold text-white", speech.speaking ? "bg-rose-500 hover:bg-rose-600" : "bg-sky-500 hover:bg-sky-600")}>
          {speech.speaking ? <><Square className="mr-1.5 h-5 w-5" /> Stop</> : <><Volume2 className="mr-1.5 h-5 w-5" /> Listen</>}
        </Button>

        {!rec.recording ? (
          <Button onClick={rec.start} data-testid="start-recording-btn" className="rounded-full bg-green-500 py-6 text-base font-bold text-white hover:bg-green-600">
            <Mic className="mr-1.5 h-5 w-5" /> Start Reading
          </Button>
        ) : (
          <Button onClick={rec.stop} data-testid="stop-recording-btn" className="rounded-full bg-rose-500 py-6 text-base font-bold text-white hover:bg-rose-600">
            <Square className="mr-1.5 h-5 w-5" /> Stop
          </Button>
        )}

        <Button onClick={onGoQuiz} variant="outline" data-testid="go-quiz-btn" className="col-span-2 rounded-full border-2 py-6 text-base font-bold sm:col-span-1">
          <BookText className="mr-1.5 h-5 w-5" /> Take Quiz
        </Button>
      </div>

      {rec.error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">{rec.error}</p>}

      {/* Recording state */}
      {rec.recording && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-3 rounded-3xl bg-rose-50 py-5" data-testid="recording-indicator">
          <span className="flex h-3 w-3 animate-pulse rounded-full bg-rose-500" />
          <span className="font-bold text-rose-600">🎤 Recording...</span>
          <span className="font-mono text-lg font-bold text-rose-700">
            {String(Math.floor(rec.seconds / 60)).padStart(2, "0")}:{String(rec.seconds % 60).padStart(2, "0")}
          </span>
        </motion.div>
      )}

      {/* After recording */}
      {!rec.recording && rec.audioUrl && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-3xl border-2 border-green-100 bg-green-50 p-6 text-center" data-testid="recording-done">
          <h3 className="font-heading text-2xl font-bold text-green-700">Great job! 🎉</h3>
          <audio src={rec.audioUrl} controls className="mx-auto w-full max-w-md" data-testid="recording-audio" />
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => { rec.reset(); setFeedback(null); }} variant="outline" data-testid="record-again-btn" className="rounded-full border-2 font-bold">
              <RotateCcw className="mr-1.5 h-4 w-4" /> Record Again
            </Button>
            <Button onClick={savePractice} disabled={saving} data-testid="save-practice-btn" className="rounded-full bg-sky-500 font-bold text-white hover:bg-sky-600">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="mr-1.5 h-4 w-4" /> Save Practice</>}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && <ReadingFeedback scores={feedback} onQuiz={onGoQuiz} />}
      </AnimatePresence>
    </div>
  );
}

function ReadingFeedback({ scores, onQuiz }) {
  const items = [
    { label: "Fluency", value: scores.fluency, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Pronunciation", value: scores.pronunciation, color: "text-green-600", bg: "bg-green-50" },
    { label: "Confidence", value: scores.confidence, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Completion", value: scores.completion, color: "text-violet-600", bg: "bg-violet-55" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-3xl border-2 border-slate-100 bg-white p-6" data-testid="reading-feedback">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-2xl font-bold text-slate-800">Your Reading Feedback</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          AI Reading Feedback · Prototype
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className={`rounded-2xl ${it.bg} p-4 text-center`}>
            <div className={`font-heading text-3xl font-bold ${it.color}`}>{it.value}%</div>
            <div className="text-xs font-bold text-slate-500">{it.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-amber-50 p-4">
        <p className="flex items-center gap-1.5 font-heading text-lg font-bold text-amber-700"><Sparkles className="h-5 w-5" /> Great Reading! 🌟</p>
        <p className="mt-1 text-sm text-amber-700/80">You read clearly and completed the story. Keep practicing difficult words.</p>
      </div>
      <Button onClick={onQuiz} data-testid="feedback-quiz-btn" className="mt-4 w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600">
        Continue to Quiz <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
    </motion.div>
  );
}

/* ---------------- Vocabulary Mode ---------------- */
function VocabularyMode({ story }) {
  const speech = useSpeech();
  const [i, setI] = useState(0);
  const vocab = story.vocabulary || [];
  const card = vocab[i];
  if (!card) return null;

  return (
    <div className="mx-auto max-w-md space-y-5">
      <div className="text-center text-sm font-bold text-slate-400" data-testid="vocab-progress">{i + 1} / {vocab.length} Words</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateY: -12 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 12 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border-2 border-slate-100 bg-white p-8 text-center shadow-sm"
          data-testid="vocab-card"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 to-amber-100">
            <BookText className="h-12 w-12 text-sky-500" />
          </div>
          <h3 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide text-slate-800">{card.word}</h3>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button onClick={() => speech.speak(card.word, 0.9, "UK")} variant="outline" data-testid="vocab-listen-uk-btn" className="rounded-full border-2 border-amber-200 bg-amber-50 font-bold text-amber-800 hover:bg-amber-100">
              <Volume2 className="mr-1.5 h-4 w-4 text-amber-600" /> 🇬🇧 UK Accent
            </Button>
            <Button onClick={() => speech.speak(card.word, 0.9, "US")} variant="outline" data-testid="vocab-listen-us-btn" className="rounded-full border-2 border-sky-200 bg-sky-50 font-bold text-sky-800 hover:bg-sky-100">
              <Volume2 className="mr-1.5 h-4 w-4 text-sky-600" /> 🇺🇸 US Accent
            </Button>
          </div>
          <div className="mt-5 space-y-3 text-left">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase text-slate-400">Meaning</div>
              <p className="text-slate-700">{card.meaning}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <div className="text-xs font-bold uppercase text-amber-500">Example</div>
              <p className="italic text-amber-800">"{card.example}"</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <Button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} variant="outline" data-testid="vocab-prev" className="rounded-full border-2 font-bold">
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <Button onClick={() => setI((v) => Math.min(vocab.length - 1, v + 1))} disabled={i === vocab.length - 1} data-testid="vocab-next" className="rounded-full bg-sky-500 font-bold text-white hover:bg-sky-600">
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Quiz Mode ---------------- */
function QuizMode({ story, onRestart }) {
  const quiz = story.quiz || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const q = quiz[current];

  const choose = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = async () => {
    if (current + 1 < quiz.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
      if (!saved) {
        try { await api.post("/quiz-results", { storyId: story.id, score, total: quiz.length }); } catch (err) { console.error(err); }
        setSaved(true);
      }
    }
  };

  if (done) {
    const stars = score === quiz.length ? 3 : score >= quiz.length - 1 ? 2 : 1;
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-2 border-slate-100 bg-white p-8 text-center" data-testid="quiz-result">
        <h3 className="font-heading text-3xl font-bold text-slate-800">Quiz Completed 🎉</h3>
        <div className="mt-4 font-heading text-5xl font-bold text-sky-500" data-testid="quiz-score">{score} / {quiz.length}</div>
        <div className="mt-4"><ScoreStars count={stars} total={3} size={36} /></div>
        <p className="mt-3 font-semibold text-slate-550">
          {stars === 3 ? "Perfect! You understood the whole story." : stars === 2 ? "Great work! Almost perfect." : "Good try! Read the story again and retry."}
        </p>
        <Button onClick={onRestart} data-testid="read-another-btn" className="mt-6 rounded-full bg-sky-500 px-8 py-6 font-bold text-white hover:bg-sky-600">
          Read Another Story
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-6" data-testid="quiz-panel">
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-slate-400">
        <span>Question {current + 1} of {quiz.length}</span>
        <span className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-amber-400" /> {score}</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-slate-800">{q.question}</h3>
      <div className="mt-5 space-y-3">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.answer;
          const isChosen = idx === selected;
          let style = "border-slate-200 bg-white hover:border-sky-300";
          if (selected !== null) {
            if (isCorrect) style = "border-green-400 bg-green-50";
            else if (isChosen) style = "border-rose-400 bg-rose-50";
            else style = "border-slate-200 bg-white opacity-60";
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              data-testid={`quiz-option-${idx}`}
              className={cn("flex w-full items-center justify-between rounded-2xl border-2 px-4 py-4 text-left font-semibold text-slate-700 transition-colors", style)}
            >
              <span><span className="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>{opt}</span>
              {selected !== null && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {selected !== null && isChosen && !isCorrect && <XCircle className="h-5 w-5 text-rose-500" />}
            </button>
          );
        })}
      </div>
      <Button onClick={next} disabled={selected === null} data-testid="quiz-next-btn" className="mt-5 w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600">
        {current + 1 < quiz.length ? "Next Question" : "See Result"}
      </Button>
    </div>
  );
}
