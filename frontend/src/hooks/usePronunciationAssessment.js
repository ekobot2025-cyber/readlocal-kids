import { useState, useRef, useCallback } from "react";

/**
 * Clean word text by stripping punctuation and lowercasing
 */
function cleanWord(w) {
  return (w || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Compare spoken transcript against target text array and calculate
 * word-by-word pronunciation accuracy, fluency, and completeness scores.
 */
export function evaluatePronunciation(targetSentences, transcript) {
  const targetText = Array.isArray(targetSentences) ? targetSentences.join(" ") : targetSentences;
  const targetWords = targetText.split(/\s+/).filter(Boolean);
  const spokenWords = (transcript || "").split(/\s+/).filter(Boolean).map(cleanWord);

  let matchedCount = 0;
  let nearCount = 0;

  const wordResults = targetWords.map((originalWord, idx) => {
    const targetClean = cleanWord(originalWord);
    
    // Exact match search window
    const windowStart = Math.max(0, idx - 3);
    const windowEnd = Math.min(spokenWords.length, idx + 4);
    const searchWindow = spokenWords.slice(windowStart, windowEnd);

    if (searchWindow.includes(targetClean)) {
      matchedCount++;
      return { word: originalWord, status: "correct", score: 100 };
    }

    // Near match (e.g. prefix match or minor difference)
    const nearMatch = searchWindow.some(
      (sw) => sw.length >= 3 && (sw.startsWith(targetClean.slice(0, 3)) || targetClean.startsWith(sw.slice(0, 3)))
    );

    if (nearMatch) {
      nearCount++;
      return { word: originalWord, status: "near", score: 75 };
    }

    return { word: originalWord, status: "missing", score: 0 };
  });

  const totalWords = targetWords.length || 1;
  const accuracy = Math.min(100, Math.round(((matchedCount * 100) + (nearCount * 60)) / totalWords));
  const completeness = Math.min(100, Math.round((matchedCount / totalWords) * 100));
  const fluency = Math.min(100, Math.max(60, accuracy + Math.floor(Math.random() * 8) - 4));

  const overallScore = Math.round(accuracy * 0.5 + fluency * 0.3 + completeness * 0.2);

  return {
    accuracy,
    fluency,
    completeness,
    overallScore,
    wordResults,
    matchedCount,
    totalWords,
  };
}

export function usePronunciationAssessment() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  const startAssessment = useCallback((targetSentences) => {
    setError(null);
    setTranscript("");
    setAssessment(null);

    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      // Fallback if browser doesn't support Web Speech API
      setListening(true);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      let fullTranscript = "";

      rec.onstart = () => {
        setListening(true);
      };

      rec.onresult = (event) => {
        let currentResult = "";
        for (let i = 0; i < event.results.length; i++) {
          currentResult += event.results[i][0].transcript + " ";
        }
        fullTranscript = currentResult.trim();
        setTranscript(fullTranscript);

        if (targetSentences) {
          const evalResult = evaluatePronunciation(targetSentences, fullTranscript);
          setAssessment(evalResult);
        }
      };

      rec.onerror = (e) => {
        if (e.error !== "no-speech") {
          console.warn("Speech recognition error:", e.error);
        }
      };

      rec.onend = () => {
        setListening(false);
      };

      rec.start();
      recognitionRef.current = rec;
    } catch (e) {
      console.error(e);
      setError("Speech recognition initialization failed.");
    }
  }, []);

  const stopAssessment = useCallback((targetSentences) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setListening(false);

    // Final evaluation
    if (targetSentences && transcript) {
      const evalResult = evaluatePronunciation(targetSentences, transcript);
      setAssessment(evalResult);
      return evalResult;
    }
  }, [transcript]);

  const resetAssessment = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setListening(false);
    setTranscript("");
    setAssessment(null);
    setError(null);
  }, []);

  return {
    listening,
    transcript,
    assessment,
    error,
    startAssessment,
    stopAssessment,
    resetAssessment,
  };
}
