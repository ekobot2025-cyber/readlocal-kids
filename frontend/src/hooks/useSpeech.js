import { useState, useRef, useCallback } from "react";
import { useAudioPlayer } from "./useAudioPlayer";

// Story sequence TTS using Web Speech API with proper stop handling
export function useSpeech(defaultAccent = "UK") {
  const [speaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [accent, setAccent] = useState(defaultAccent);

  // Use a ref for accent so callbacks always get fresh value (no stale closure)
  const accentRef = useRef(defaultAccent);
  const cancelledRef = useRef(false);

  const { stop: stopAudio, speakText } = useAudioPlayer();

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Stop all audio immediately
  const stop = useCallback(() => {
    cancelledRef.current = true;
    stopAudio();
    setSpeaking(false);
    setActiveIndex(-1);
    // Give browser a tick to cancel, then reset flag
    setTimeout(() => { cancelledRef.current = false; }, 100);
  }, [stopAudio]);

  // Update accent ref whenever state changes
  const handleSetAccent = useCallback((newAccent) => {
    accentRef.current = newAccent;
    setAccent(newAccent);
  }, []);

  // Speak a single text (used for story listen button)
  const speak = useCallback(
    (text, rate = 1, targetAccent = null) => {
      const chosenAccent = targetAccent || accentRef.current;
      speakText(text, chosenAccent, rate);
      setSpeaking(true);
    },
    [speakText]
  );

  // Speak a sequence of sentences one by one with active line highlighting
  const speakSequence = useCallback(
    (sentences, rate = 1, onDone, targetAccent = null) => {
      if (!supported) return;
      const chosenAccent = targetAccent || accentRef.current;

      // Cancel any running speech
      window.speechSynthesis.cancel();
      cancelledRef.current = false;
      setSpeaking(true);

      let i = 0;

      const next = () => {
        if (cancelledRef.current) {
          setSpeaking(false);
          setActiveIndex(-1);
          return;
        }

        if (i >= sentences.length) {
          setSpeaking(false);
          setActiveIndex(-1);
          if (onDone) onDone();
          return;
        }

        setActiveIndex(i);
        const u = new SpeechSynthesisUtterance(sentences[i]);
        u.lang = chosenAccent === "UK" ? "en-GB" : "en-US";
        u.rate = rate;

        const voices = window.speechSynthesis.getVoices();
        if (chosenAccent === "UK") {
          const v =
            voices.find((v) =>
              (v.lang === "en-GB" || v.lang === "en_GB") &&
              /google|hazel|george|daniel|kate|serena/i.test(v.name)
            ) || voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB");
          if (v) u.voice = v;
        } else {
          const v =
            voices.find((v) =>
              (v.lang === "en-US" || v.lang === "en_US") &&
              /google|zira|samantha|jenny|aria/i.test(v.name)
            ) || voices.find((v) => v.lang === "en-US" || v.lang === "en_US");
          if (v) u.voice = v;
        }

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

  return { supported, speaking, activeIndex, accent, setAccent: handleSetAccent, speak, speakSequence, stop };
}
