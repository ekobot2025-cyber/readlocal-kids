import { useEffect, useRef, useState, useCallback } from "react";

// Text-to-Speech using the browser Web Speech API with dual UK & US accent support
export function useSpeech(defaultAccent = "UK") {
  const [speaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [accent, setAccent] = useState(defaultAccent); // "UK" or "US"
  const voiceUkRef = useRef(null);
  const voiceUsRef = useRef(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!supported) return;
    const pickVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Pick UK Voice (British English)
      voiceUkRef.current =
        voices.find((v) => (v.lang === "en-GB" || v.lang === "en_GB") && /female|google|hazel|george|serena|kate|daniel|oliver/i.test(v.name)) ||
        voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] ||
        null;

      // Pick US Voice (American English)
      voiceUsRef.current =
        voices.find((v) => (v.lang === "en-US" || v.lang === "en_US") && /female|zira|samantha|google|jenny|guy|aria/i.test(v.name)) ||
        voices.find((v) => v.lang === "en-US" || v.lang === "en_US") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] ||
        null;
    };

    pickVoices();
    window.speechSynthesis.onvoiceschanged = pickVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setActiveIndex(-1);
  }, [supported]);

  // Speak a single text with specified or current accent ("UK" or "US")
  const speak = useCallback(
    (text, rate = 1, targetAccent = null) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const chosenAccent = targetAccent || accent;
      
      if (chosenAccent === "UK") {
        u.lang = "en-GB";
        if (voiceUkRef.current) u.voice = voiceUkRef.current;
      } else {
        u.lang = "en-US";
        if (voiceUsRef.current) u.voice = voiceUsRef.current;
      }

      u.rate = rate;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    },
    [supported, accent]
  );

  // Speak sequence with specified or current accent
  const speakSequence = useCallback(
    (sentences, rate = 1, onDone, targetAccent = null) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      setSpeaking(true);
      const chosenAccent = targetAccent || accent;
      let i = 0;
      const next = () => {
        if (i >= sentences.length) {
          setSpeaking(false);
          setActiveIndex(-1);
          onDone && onDone();
          return;
        }
        setActiveIndex(i);
        const u = new SpeechSynthesisUtterance(sentences[i]);
        if (chosenAccent === "UK") {
          u.lang = "en-GB";
          if (voiceUkRef.current) u.voice = voiceUkRef.current;
        } else {
          u.lang = "en-US";
          if (voiceUsRef.current) u.voice = voiceUsRef.current;
        }
        u.rate = rate;
        u.onend = () => {
          i += 1;
          next();
        };
        u.onerror = () => {
          i += 1;
          next();
        };
        window.speechSynthesis.speak(u);
      };
      next();
    },
    [supported, accent]
  );

  return { supported, speaking, activeIndex, accent, setAccent, speak, speakSequence, stop };
}
