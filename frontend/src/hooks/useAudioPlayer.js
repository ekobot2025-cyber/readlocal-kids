import { useRef, useCallback } from "react";

// Audio player hook using pre-generated MP3 files (UK & US accents)
// Falls back to Web Speech API if file is not available
export function useAudioPlayer() {
  const audioRef = useRef(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Also cancel any Web Speech API utterances
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Play a vocabulary word using pre-generated MP3
  // accent: "UK" or "US"
  const playWord = useCallback((word, accent = "UK", onEnd) => {
    stop(); // Stop any current audio first

    if (!word) {
      if (onEnd) onEnd();
      return;
    }

    const cleanWord = word.trim();
    const normalized = cleanWord.toLowerCase().replace(/[-\s]+/g, "_");
    const accentKey = accent === "UK" ? "uk" : "us";
    const src = `/audio/vocab/${normalized}_${accentKey}.mp3`;

    const audio = new Audio(src);
    audioRef.current = audio;

    let ended = false;
    const handleEnd = () => {
      if (ended) return;
      ended = true;
      audioRef.current = null;
      if (onEnd) onEnd();
    };

    audio.onended = handleEnd;

    let fallbackTriggered = false;
    const triggerFallback = () => {
      if (fallbackTriggered || ended) return;
      fallbackTriggered = true;
      console.warn(`Audio file not found or failed: ${src}, falling back to Web Speech API`);
      audioRef.current = null;

      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(cleanWord);
          u.lang = accent === "UK" ? "en-GB" : "en-US";
          u.rate = 0.9;

          const speak = () => {
            const voices = window.speechSynthesis.getVoices();
            if (accent === "UK") {
              const ukVoice = voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB");
              if (ukVoice) u.voice = ukVoice;
            } else {
              const usVoice = voices.find((v) => v.lang === "en-US" || v.lang === "en_US");
              if (usVoice) u.voice = usVoice;
            }
            u.onend = handleEnd;
            u.onerror = handleEnd;
            window.speechSynthesis.speak(u);
          };

          // Delay slightly to prevent Chromium bug where cancel() immediately cancels speak()
          setTimeout(speak, 40);
        } catch (e) {
          console.error("Web Speech API fallback error:", e);
          handleEnd();
        }
      } else {
        handleEnd();
      }
    };

    audio.onerror = triggerFallback;

    audio.play().catch(() => {
      triggerFallback();
    });
  }, [stop]);

  // Play a full story sentence-by-sentence using Web Speech API (for longer text)
  const speakText = useCallback((text, accent = "UK", rate = 1, onEnd) => {
    stop();
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = accent === "UK" ? "en-GB" : "en-US";
    u.rate = rate;

    // Select best voice
    const loadAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      if (accent === "UK") {
        const v = voices.find((v) => (v.lang === "en-GB" || v.lang === "en_GB") &&
          /google|hazel|george|daniel|kate|serena/i.test(v.name)) ||
          voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB");
        if (v) u.voice = v;
      } else {
        const v = voices.find((v) => (v.lang === "en-US" || v.lang === "en_US") &&
          /google|zira|samantha|jenny|aria/i.test(v.name)) ||
          voices.find((v) => v.lang === "en-US" || v.lang === "en_US");
        if (v) u.voice = v;
      }
      u.onend = () => { if (onEnd) onEnd(); };
      u.onerror = () => { if (onEnd) onEnd(); };
      window.speechSynthesis.speak(u);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      loadAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = loadAndSpeak;
    }
  }, [stop]);

  return { playWord, speakText, stop };
}
