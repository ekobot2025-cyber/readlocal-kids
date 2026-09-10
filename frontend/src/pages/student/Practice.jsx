import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Mic, Square, ChevronRight, Star, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Practice() {
  const audio = useAudioPlayer();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { stars, heard, success }

  const recognitionRef = useRef(null);

  useEffect(() => {
    api.get("/stories").then((r) => {
      const all = [];
      r.data.forEach((s) => (s.vocabulary || []).forEach((v) => all.push({ ...v, story: s.title })));
      const unique = Array.from(new Map(all.map((w) => [w.word, w])).values());
      setWords(unique.sort(() => Math.random() - 0.5));
    })
    .catch((e) => console.error(e))
    .finally(() => setLoading(false));
  }, []);

  const word = words[i];

  const startListening = () => {
    setError(null);
    setResult(null);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // If browser doesn't support Web Speech API, fall back to a mock record simulator
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        const stars = 3 + Math.floor(Math.random() * 3); // 3 to 5 stars
        setResult({ stars, heard: word.word.toLowerCase(), success: true, isMock: true });
      }, 2000);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setRecording(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        const target = word.word.trim().toLowerCase();

        // Clean punctuation
        const cleanTranscript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
        const cleanTarget = target.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

        const isMatch = cleanTranscript === cleanTarget || 
                        cleanTranscript.includes(cleanTarget) || 
                        cleanTarget.includes(cleanTranscript);

        if (isMatch) {
          setResult({ stars: 5, heard: transcript, success: true });
        } else {
          // Semi-match or close guess
          const stars = cleanTranscript.slice(0, 3) === cleanTarget.slice(0, 3) ? 3 : 2;
          setResult({ stars, heard: transcript, success: false });
        }
      };

      rec.onerror = (e) => {
        if (e.error === "no-speech") {
          setError("No speech was detected. Try again and speak clearly.");
        } else if (e.error === "not-allowed") {
          setError("Microphone permission denied.");
        } else {
          setError("Speech recognition failed. Try again.");
        }
      };

      rec.onend = () => {
        setRecording(false);
      };

      rec.start();
      recognitionRef.current = rec;
    } catch (e) {
      setError("Failed to initialize speech recognition.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setRecording(false);
  };

  const nextWord = () => {
    setResult(null);
    setError(null);
    setI((v) => (v + 1) % words.length);
  };

  if (loading) return <Skeleton className="mx-auto h-96 max-w-md rounded-3xl" />;
  if (!word) return null;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-slate-800">Say the Word</h1>
        <p className="text-slate-500">Listen, then speak the word aloud.</p>
      </div>

      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border-2 border-slate-100 bg-white p-8 text-center shadow-sm" data-testid="pronunciation-card">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">from "{word.story}"</span>
        <h2 className="mt-2 font-heading text-4xl font-bold text-slate-800 uppercase tracking-wide">{word.word}</h2>
        <p className="mt-2 text-slate-500">{word.meaning}</p>

        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => audio.playWord(word.word, "UK")} variant="outline" data-testid="pron-listen-btn" className="rounded-full border-2 py-6 font-bold text-sky-600">
            <Volume2 className="mr-1.5 h-5 w-5" /> Listen
          </Button>
          {!recording ? (
            <Button onClick={startListening} data-testid="pron-speak-btn" className="rounded-full bg-green-500 py-6 font-bold text-white hover:bg-green-600 shadow-[0_4px_14px_rgba(34,197,94,0.3)]">
              <Mic className="mr-1.5 h-5 w-5" /> Speak
            </Button>
          ) : (
            <Button onClick={stopListening} data-testid="pron-stop-btn" className="rounded-full bg-rose-500 py-6 font-bold text-white hover:bg-rose-600">
              <Square className="mr-1.5 h-5 w-5" /> Stop
            </Button>
          )}
        </div>

        {recording && (
          <p className="mt-4 flex items-center justify-center gap-2 font-bold text-rose-500 animate-pulse" data-testid="pron-recording">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Listening... speak now!
          </p>
        )}

        {error && <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600">{error}</p>}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-6 rounded-2xl p-5 bg-slate-50 border border-slate-100" data-testid="pron-result">
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={s < result.stars ? "h-7 w-7 fill-amber-400 text-amber-400" : "h-7 w-7 text-slate-200"} />
                ))}
              </div>
              <p className={`mt-2 font-heading text-xl font-bold ${result.success ? "text-green-600" : "text-amber-600"}`}>
                {result.success ? "Good pronunciation! ⭐" : "Try Again! Keep practicing."}
              </p>
              <div className="mt-2 text-xs font-bold text-slate-400">
                You said: <span className="text-slate-700 italic">"{result.heard || "(silent)"}"</span>
              </div>
              {result.isMock && (
                <div className="mt-1 text-[10px] text-slate-400">
                  (Web Speech API unsupported, fallback simulation enabled)
                </div>
              )}
              <div className="mt-3 flex justify-center gap-2">
                <Button onClick={() => { setResult(null); setError(null); }} variant="outline" size="sm" data-testid="pron-retry-btn" className="rounded-full border-2 font-bold text-xs">
                  <RotateCcw className="mr-1 h-3.5 w-3.5" /> Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Button onClick={nextWord} data-testid="pron-next-btn" className="w-full rounded-full bg-sky-500 py-6 font-bold text-white hover:bg-sky-600">
        Next Word <ChevronRight className="ml-1 h-5 w-5" />
      </Button>
      <p className="text-center text-xs font-bold text-slate-400">Word {i + 1} of {words.length}</p>
    </div>
  );
}
