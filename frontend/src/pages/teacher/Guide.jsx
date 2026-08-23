import React from "react";
import { BookOpen, HelpCircle, FileText, CheckSquare, Info } from "lucide-react";

const STAGES = [
  { step: 1, title: "Pre-Reading", desc: "Teacher introduces Papua's local culture concepts and important vocabulary using illustrations." },
  { step: 2, title: "Listen", desc: "Students listen to the native-style model audio pronunciation of the story sentences." },
  { step: 3, title: "Reading Aloud", desc: "Students read the story texts aloud, focusing on punctuation, intonation, and rhythm." },
  { step: 4, title: "Practice", desc: "Students record their own reading voice, play it back, and save their practice attempt." },
  { step: 5, title: "Vocabulary", desc: "Students review word flashcards, meanings, and practical context examples." },
  { step: 6, title: "Comprehension", desc: "Students complete a 3-question reading comprehension quiz to test story understanding." },
  { step: 7, title: "Assessment", desc: "Teacher scores the student's fluency, accuracy, intonation, pronunciation, and confidence." },
];

export default function Guide() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Teacher Guide</h1>
        <p className="text-slate-500">How to implement the ReadLocal Kids reading program in class.</p>
      </div>

      <div className="space-y-4">
        {STAGES.map((s) => (
          <div key={s.step} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 font-heading text-lg font-bold">
              {s.step}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-800">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
