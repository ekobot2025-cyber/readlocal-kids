import { useRef, useState, useCallback, useEffect } from "react";

// Microphone recording via the MediaRecorder API
export function useRecorder() {
  const supported =
    typeof window !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof window.MediaRecorder !== "undefined";

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const blobRef = useRef(null);

  const start = useCallback(async () => {
    setError(null);
    if (!supported) {
      setError("Recording is not supported on this device.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        blobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRef.current = mr;
      mr.start();
      setRecording(true);
      setSeconds(0);
      setAudioUrl(null);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      setError("Microphone permission denied. Please allow access to record.");
    }
  }, [supported]);

  const stop = useCallback(() => {
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      mediaRef.current.stop();
    }
    clearInterval(timerRef.current);
    setRecording(false);
  }, []);

  const reset = useCallback(() => {
    setAudioUrl(null);
    setSeconds(0);
    blobRef.current = null;
  }, []);

  const getBase64 = useCallback(() => {
    return new Promise((resolve) => {
      if (!blobRef.current) return resolve(null);
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blobRef.current);
    });
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { supported, recording, seconds, audioUrl, error, start, stop, reset, getBase64 };
}
