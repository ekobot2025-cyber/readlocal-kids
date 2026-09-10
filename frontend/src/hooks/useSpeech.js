import { useEffect, useRef, useState, useCallback } from "react";

// Text-to-Speech using the browser Web Speech API
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const voiceRef = useRef(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!supported) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        // Priority 1: UK English (en-GB) voices like Google UK English, Hazel, George, Serena, Kate, Daniel
        voices.find((v) => (v.lang === "en-GB" || v.lang === "en_GB") && /female|google|hazel|george|serena|kate|daniel|oliver/i.test(v.name)) ||
        voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
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

  // Speak a single text with UK British English accent
  const speak = useCallback(
    (text, rate = 1) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = rate;
      if (voiceRef.current) u.voice = voiceRef.current;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    },
    [supported]
  );

  // Speak an array of sentences with UK British English accent
  const speakSequence = useCallback(
    (sentences, rate = 1, onDone) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      setSpeaking(true);
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
        u.lang = "en-GB";
        u.rate = rate;
        if (voiceRef.current) u.voice = voiceRef.current;
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
    [supported]
  );

  return { supported, speaking, activeIndex, speak, speakSequence, stop };
}
