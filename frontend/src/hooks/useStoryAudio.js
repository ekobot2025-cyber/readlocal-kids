import { useRef, useState, useCallback } from "react";

/**
 * Hook for playing full story text sentence-by-sentence using pre-generated MP3 files.
 * Falls back to Web Speech API if an MP3 file is not found.
 *
 * MP3 file path pattern: /audio/stories/{storyId}_s{index}_uk.mp3 (or _us.mp3)
 */
export function useStoryAudio() {
  const [speaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [accent, setAccentState] = useState("UK");

  const accentRef = useRef("UK");
  const audioRef = useRef(null);
  const cancelledRef = useRef(false);

  // Keep ref in sync with state
  const setAccent = useCallback((newAccent) => {
    accentRef.current = newAccent;
    setAccentState(newAccent);
  }, []);

  // Stop all playback immediately
  const stop = useCallback(() => {
    cancelledRef.current = true;

    // Stop HTML5 Audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Cancel Web Speech API
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
    setActiveIndex(-1);

    setTimeout(() => {
      cancelledRef.current = false;
    }, 100);
  }, []);

  /**
   * Play sentences one by one using MP3 files
   * @param {string} storyId - e.g. "story-1"
   * @param {string[]} sentences - array of sentence strings
   * @param {number} rate - playback rate (0.7 / 1 / 1.3)
   * @param {Function} onDone - called when all sentences finish
   */
  const playSentences = useCallback(
    (storyId, sentences, rate = 1, onDone) => {
      stop();
      cancelledRef.current = false;
      setSpeaking(true);

      // Defensively flatten in case nested array is passed
      const cleanSentences = (Array.isArray(sentences) ? sentences : [])
        .flat(Infinity)
        .filter((s) => typeof s === "string" && s.trim().length > 0);

      const chosenAccent = accentRef.current;
      let i = 0;

      const playNext = () => {
        if (cancelledRef.current) {
          setSpeaking(false);
          setActiveIndex(-1);
          return;
        }

        if (i >= cleanSentences.length) {
          setSpeaking(false);
          setActiveIndex(-1);
          if (onDone) onDone();
          return;
        }

        setActiveIndex(i);
        const accentKey = chosenAccent === "UK" ? "uk" : "us";
        // Cache-busting parameter to prevent browsers from serving obsolete cached MP3s
        const src = `/audio/stories/${storyId}_s${i}_${accentKey}.mp3?v=20260910b`;

        // Try MP3 first
        const audio = new Audio(src);
        audioRef.current = audio;

        // Adjust playback rate for speed control
        audio.playbackRate = rate;

        audio.onended = () => {
          if (cancelledRef.current) return;
          audioRef.current = null;
          i += 1;
          playNext();
        };

        audio.onerror = () => {
          // Fallback: Web Speech API for this sentence
          audioRef.current = null;
          if (cancelledRef.current) return;

          if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(cleanSentences[i]);
            u.lang = chosenAccent === "UK" ? "en-GB" : "en-US";
            u.rate = rate;

            // Try to pick the best matching voice
            const voices = window.speechSynthesis.getVoices();
            if (chosenAccent === "UK") {
              const v =
                voices.find(
                  (v) =>
                    (v.lang === "en-GB" || v.lang === "en_GB") &&
                    /google|hazel|george|daniel|kate|serena/i.test(v.name)
                ) || voices.find((v) => v.lang === "en-GB" || v.lang === "en_GB");
              if (v) u.voice = v;
            } else {
              const v =
                voices.find(
                  (v) =>
                    (v.lang === "en-US" || v.lang === "en_US") &&
                    /google|zira|samantha|jenny|aria/i.test(v.name)
                ) || voices.find((v) => v.lang === "en-US" || v.lang === "en_US");
              if (v) u.voice = v;
            }

            u.onend = () => {
              if (cancelledRef.current) return;
              i += 1;
              playNext();
            };
            u.onerror = () => {
              if (cancelledRef.current) return;
              i += 1;
              playNext();
            };
            window.speechSynthesis.speak(u);
          } else {
            i += 1;
            playNext();
          }
        };

        audio.play().catch(() => {
          audio.onerror();
        });
      };

      playNext();
    },
    [stop]
  );

  return { speaking, activeIndex, accent, setAccent, playSentences, stop };
}
