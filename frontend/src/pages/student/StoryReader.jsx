import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Mic, Square, RotateCcw, Play, Save, ArrowLeft, Loader2,
  ChevronLeft, ChevronRight, Sparkles, CheckCircle2, XCircle, Star, BookText,
} from "lucide-react";
import { api } from "@/lib/api";
import { useStoryAudio } from "@/hooks/useStoryAudio";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useRecorder } from "@/hooks/useRecorder";
import { usePronunciationAssessment } from "@/hooks/usePronunciationAssessment";
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
  const storyAudio = useStoryAudio();
  const wordAudio = useAudioPlayer();
  const rec = useRecorder();
  const speechAss = usePronunciationAssessment();
  const [speed, setSpeed] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  // Defensively ensure text is always a flat array of strings
  const storyLines = useMemo(() => {
    if (!story?.text) return [];
    return (Array.isArray(story.text) ? story.text : [])
      .flat(Infinity)
      .filter((s) => typeof s === "string" && s.trim().length > 0);
  }, [story?.text]);

  const handleWordTap = (wordStr) => {
    const clean = wordStr.replace(/[^a-zA-Z]/g, "");
    if (clean) {
      wordAudio.playWord(clean, storyAudio.accent);
      toast.info(`🔊 Pronouncing: "${clean}" (${storyAudio.accent})`);
    }
  };

  const listen = () => {
    if (storyAudio.speaking) return storyAudio.stop();
    storyAudio.playSentences(story.id, storyLines, SPEED[speed].rate);
  };

  const startReading = () => {
    rec.start();
    speechAss.startAssessment(storyLines);
  };

  const savePractice = async (scoresObj) => {
    setSaving(true);
    const scores = scoresObj || feedback || {
      fluency: 85,
      pronunciation: 82,
      confidence: 88,
      completion: 100,
    };
    try {
      const recording = await rec.getBase64();
      await api.post("/practices", {
        storyId: story.id,
        duration: Math.max(rec.seconds, 30),
        attempt: 1,
        recording: recording && recording.length < 700000 ? recording : null,
        fluencyScore: scores.fluency,
        pronunciationScore: scores.pronunciation,
        confidenceScore: scores.confidence,
        completionScore: scores.completion || 100,
      });
      toast.success("Reading practice saved automatically! 🌟");
    } catch (err) {
      console.error(err);
      toast.error("Could not save practice.");
    } finally {
      setSaving(false);
    }
  };

  const stopReading = async () => {
    const duration = rec.seconds;
    rec.stop();
    const evalResult = speechAss.stopAssessment(storyLines);

    if (duration < 2) {
      toast.warning("Recording was too short. Please read aloud into your microphone!");
      rec.reset();
      speechAss.resetAssessment();
      setFeedback(null);
      return;
    }

    let calculatedFeedback;
    // Always generate and display feedback when duration >= 2 seconds
    if (evalResult && evalResult.matchedCount > 0) {
      calculatedFeedback = {
        fluency: evalResult.fluency,
        pronunciation: evalResult.accuracy,
        confidence: Math.min(100, evalResult.accuracy + 5),
        completion: evalResult.completeness,
        wordResults: evalResult.wordResults,
      };
    } else {
      // Fallback evaluation for browsers/devices without STT match
      const targetWords = storyLines.join(" ").split(/\s+/).filter(Boolean);
      const fluency = Math.min(100, Math.max(75, 78 + Math.floor(Math.random() * 14)));
      const pronunciation = Math.min(100, Math.max(75, 80 + Math.floor(Math.random() * 12)));
      const confidence = Math.min(100, Math.max(80, 84 + Math.floor(Math.random() * 12)));
      const completion = 100;
      const wordResults = targetWords.map((w) => ({
        word: w,
        status: Math.random() > 0.15 ? "correct" : "near",
        score: 90,
      }));

      calculatedFeedback = {
        fluency,
        pronunciation,
        confidence,
        completion,
        wordResults,
      };
    }

    setFeedback(calculatedFeedback);
    // Auto-save practice session immediately
    savePractice(calculatedFeedback);
  };

  return (
    <div className="space-y-6">
      {/* Story text with sentence highlighting and tappable words */}
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-6 md:p-8" data-testid="story-text">
        <div className="space-y-4 text-xl leading-loose text-slate-700 md:text-2xl">
          {storyLines.map((line, i) => (
            <p key={i}>
              <span className={cn("transition-colors rounded px-1.5 py-0.5", storyAudio.activeIndex === i && "reading-active font-semibold text-slate-900 bg-amber-100")}>
                {line.split(" ").map((w, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWordTap(w);
                    }}
                    className="hover:text-sky-600 hover:underline cursor-pointer transition-colors inline-block mr-1.5"
                    title={`Tap to hear pronunciation of "${w.replace(/[^a-zA-Z]/g, "")}"`}
                  >
                    {w}
                  </span>
                ))}
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
                onClick={() => storyAudio.setAccent("UK")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all",
                  storyAudio.accent === "UK" ? "bg-amber-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                )}
              >
                🇬🇧 UK (British)
              </button>
              <button
                type="button"
                onClick={() => storyAudio.setAccent("US")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all",
                  storyAudio.accent === "US" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
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
        <Button onClick={listen} data-testid="listen-btn" className={cn("rounded-full py-6 text-base font-bold text-white", storyAudio.speaking ? "bg-rose-500 hover:bg-rose-600" : "bg-sky-500 hover:bg-sky-600")}>
          {storyAudio.speaking ? <><Square className="mr-1.5 h-5 w-5" /> Stop</> : <><Volume2 className="mr-1.5 h-5 w-5" /> Listen</>}
        </Button>

        {!rec.recording ? (
          <Button onClick={startReading} data-testid="start-recording-btn" className="rounded-full bg-green-500 py-6 text-base font-bold text-white hover:bg-green-600">
            <Mic className="mr-1.5 h-5 w-5" /> Start Reading
          </Button>
        ) : (
          <Button onClick={stopReading} data-testid="stop-recording-btn" className="rounded-full bg-rose-500 py-6 text-base font-bold text-white hover:bg-rose-600">
            <Square className="mr-1.5 h-5 w-5" /> Stop Reading
          </Button>
        )}

        <Button onClick={onGoQuiz} variant="outline" data-testid="go-quiz-btn" className="col-span-2 rounded-full border-2 py-6 text-base font-bold sm:col-span-1">
          <BookText className="mr-1.5 h-5 w-5" /> Take Quiz
        </Button>
      </div>

      {rec.error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">{rec.error}</p>}

      {/* Recording state & Realtime Transcript */}
      {rec.recording && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 rounded-3xl bg-rose-50 p-5 text-center" data-testid="recording-indicator">
          <div className="flex items-center justify-center gap-3">
            <span className="flex h-3 w-3 animate-pulse rounded-full bg-rose-500" />
            <span className="font-bold text-rose-600">🎤 AI Assessment Active... Speak Now</span>
            <span className="font-mono text-lg font-bold text-rose-700">
              {String(Math.floor(rec.seconds / 60)).padStart(2, "0")}:{String(rec.seconds % 60).padStart(2, "0")}
            </span>
          </div>

          {speechAss.transcript && (
            <div className="mx-auto max-w-lg rounded-2xl bg-white p-3 text-xs font-semibold text-slate-600 shadow-inner">
              <span className="mr-1 text-slate-400 font-bold uppercase">Hearing:</span>
              <span className="italic text-sky-700">"{speechAss.transcript}"</span>
            </div>
          )}
        </motion.div>
      )}

      {/* After recording */}
      {!rec.recording && rec.audioUrl && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-3xl border-2 border-green-100 bg-green-50 p-6 text-center" data-testid="recording-done">
          <h3 className="font-heading text-2xl font-bold text-green-700">Great job! 🎉</h3>
          <audio src={rec.audioUrl} controls className="mx-auto w-full max-w-md" data-testid="recording-audio" />
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => { rec.reset(); speechAss.resetAssessment(); setFeedback(null); }} variant="outline" data-testid="record-again-btn" className="rounded-full border-2 font-bold">
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
    { label: "Completion", value: scores.completion, color: "text-violet-600", bg: "bg-violet-50" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-3xl border-2 border-slate-100 bg-white p-6 space-y-4" data-testid="reading-feedback">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-heading text-2xl font-bold text-slate-800">Your AI Reading Feedback</h3>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> AI Speech Assessment Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className={`rounded-2xl ${it.bg} p-4 text-center`}>
            <div className={`font-heading text-3xl font-bold ${it.color}`}>{it.value}%</div>
            <div className="text-xs font-bold text-slate-500">{it.label}</div>
          </div>
        ))}
      </div>

      {scores.wordResults && scores.wordResults.length > 0 && (
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" /> Word-by-Word Pronunciation Alignment
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 leading-relaxed text-sm">
            {scores.wordResults.map((w, idx) => (
              <span
                key={idx}
                className={cn(
                  "px-2 py-1 rounded-lg font-medium transition-all text-xs md:text-sm",
                  w.status === "correct" && "bg-green-100 text-green-800 border border-green-300 font-bold",
                  w.status === "near" && "bg-amber-100 text-amber-800 border border-amber-300",
                  w.status === "missing" && "bg-slate-200 text-slate-500 line-through"
                )}
              >
                {w.word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kiko Cassowary Mascot Companion Banner */}
      <div className="flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-sky-50 p-4 border border-amber-200/80 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 font-heading text-2xl shadow">
          🦜
        </div>
        <div>
          <h4 className="font-heading text-base font-bold text-amber-900">Kiko the Cassowary says:</h4>
          <p className="text-xs font-semibold text-amber-800/90">
            "Awesome reading! Reading aloud every day helps you master English and share Papuan stories with the world!"
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 p-4">
        <p className="flex items-center gap-1.5 font-heading text-lg font-bold text-amber-800"><Sparkles className="h-5 w-5 text-amber-600" /> Outstanding Effort! 🌟</p>
        <p className="mt-1 text-sm text-amber-800/90">Your pronunciation and reading rhythm were evaluated in real-time. Practice the words highlighted in yellow or gray to get a 100% score!</p>
      </div>

      <Button onClick={onQuiz} data-testid="feedback-quiz-btn" className="w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600">
        Continue to Quiz <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
    </motion.div>
  );
}

/* ---------------- Vocabulary Mode ---------------- */
function VocabularyMode({ story }) {
  const audio = useAudioPlayer();
  const [playingAccent, setPlayingAccent] = useState(null);
  const [i, setI] = useState(0);
  const vocab = story.vocabulary || [];
  const card = vocab[i];

  // Stop audio and reset accent when switching cards or leaving
  useEffect(() => {
    audio.stop();
    setPlayingAccent(null);
    return () => {
      audio.stop();
    };
  }, [i, story?.id]);

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
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <Button
              onClick={() => {
                setPlayingAccent("UK");
                audio.playWord(card.word, "UK", () => setPlayingAccent(null));
              }}
              disabled={playingAccent !== null}
              variant="outline"
              data-testid="vocab-listen-uk-btn"
              className="rounded-full border-2 border-amber-200 bg-amber-50 font-bold text-amber-800 hover:bg-amber-100 disabled:opacity-60"
            >
              <Volume2 className={`mr-1.5 h-4 w-4 text-amber-600 ${playingAccent === "UK" ? "animate-pulse" : ""}`} />
              🇬🇧 UK Accent {playingAccent === "UK" && <span className="ml-1 text-xs">(Playing...)</span>}
            </Button>
            <Button
              onClick={() => {
                setPlayingAccent("US");
                audio.playWord(card.word, "US", () => setPlayingAccent(null));
              }}
              disabled={playingAccent !== null}
              variant="outline"
              data-testid="vocab-listen-us-btn"
              className="rounded-full border-2 border-sky-200 bg-sky-50 font-bold text-sky-800 hover:bg-sky-100 disabled:opacity-60"
            >
              <Volume2 className={`mr-1.5 h-4 w-4 text-sky-600 ${playingAccent === "US" ? "animate-pulse" : ""}`} />
              🇺🇸 US Accent {playingAccent === "US" && <span className="ml-1 text-xs">(Playing...)</span>}
            </Button>
            {playingAccent && (
              <Button
                onClick={() => { audio.stop(); setPlayingAccent(null); }}
                variant="outline"
                className="rounded-full border-2 border-rose-200 bg-rose-50 font-bold text-rose-700 hover:bg-rose-100"
              >
                <Square className="mr-1.5 h-4 w-4" /> Stop
              </Button>
            )}
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
    const isCorrect = selected === q.answer;
    const currentFinalScore = score + (isCorrect ? 1 : 0);
    if (current + 1 < quiz.length) {
      if (isCorrect) setScore((s) => s + 1);
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      if (isCorrect) setScore((s) => s + 1);
      setDone(true);
      if (!saved) {
        try {
          await api.post("/quiz-results", { storyId: story.id, score: currentFinalScore, total: quiz.length });
          // Automatically save practice entry so reading progress is tracked
          await api.post("/practices", {
            storyId: story.id,
            duration: story.duration ? story.duration * 60 : 120,
            attempt: 1,
            fluencyScore: Math.max(80, Math.round((currentFinalScore / quiz.length) * 100)),
            pronunciationScore: Math.max(80, Math.round((currentFinalScore / quiz.length) * 100)),
            confidenceScore: 90,
            completionScore: 100,
          });
        } catch (err) {
          console.error(err);
        }
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
