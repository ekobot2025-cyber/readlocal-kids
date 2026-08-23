import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpenCheck, Trophy, Mic, ClipboardCheck, Save, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CRITERIA = ["pronunciation", "fluency", "intonation", "accuracy", "confidence"];
const LABELS = { pronunciation: "Pronunciation", fluency: "Fluency", intonation: "Intonation", accuracy: "Accuracy", confidence: "Confidence" };

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [stories, setStories] = useState([]);

  const load = () => api.get(`/students/${id}`).then((r) => setData(r.data));
  useEffect(() => { load(); api.get("/stories").then((r) => setStories(r.data)); }, [id]); // eslint-disable-line

  if (!data) return <Skeleton className="h-96 rounded-3xl" />;
  const storyTitle = (sid) => stories.find((s) => s.id === sid)?.title || "Story";

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/teacher/students")} data-testid="profile-back" className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-slate-600">
        <ArrowLeft className="h-4 w-4" /> Back to Students
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Avatar className="h-20 w-20 border-2 border-slate-100"><AvatarImage src={data.avatar} /><AvatarFallback>{data.name[0]}</AvatarFallback></Avatar>
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-800">{data.name}</h1>
          <p className="text-slate-400">{data.grade} · Student Reading Profile</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { l: "Completed Stories", v: data.storiesCompleted, icon: BookOpenCheck, c: "bg-sky-500" },
          { l: "Recorded Practices", v: data.readingPractices, icon: Mic, c: "bg-green-500" },
          { l: "Reading Score", v: `${data.avgReading}%`, icon: Trophy, c: "bg-amber-400" },
          { l: "Quiz Score", v: `${data.avgQuiz}%`, icon: ClipboardCheck, c: "bg-violet-500" },
        ].map((s) => { const Icon = s.icon; return (
          <div key={s.l} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${s.c} text-white`}><Icon className="h-5 w-5" /></div>
            <div className="mt-2 font-heading text-2xl font-bold text-slate-800">{s.v}</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">{s.l}</div>
          </div>
        );})}
      </div>

      {/* Recorded practices */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Recorded Practices</h2>
        {data.practices && data.practices.length ? (
          <div className="space-y-3">
            {data.practices.slice(0, 8).map((p, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3" data-testid={`practice-row-${i}`}>
                <div>
                  <div className="font-bold text-slate-700">{storyTitle(p.storyId)}</div>
                  <div className="text-xs text-slate-400">{new Date(p.date).toLocaleDateString()} · {p.duration}s · Fluency {p.fluencyScore}% · Pron {p.pronunciationScore}%</div>
                </div>
                {p.recording ? (
                  <audio src={p.recording} controls className="h-9 w-52" data-testid={`practice-audio-${i}`} />
                ) : (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-500">No recording</span>
                )}
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-slate-400">No practices recorded yet.</p>}
      </div>

      {/* Assessment rubric */}
      <AssessmentForm studentId={id} stories={stories} onSaved={load} existing={data.assessments} storyTitle={storyTitle} />
    </div>
  );
}

function AssessmentForm({ studentId, stories, onSaved, existing, storyTitle }) {
  const [scores, setScores] = useState({ pronunciation: 3, fluency: 3, intonation: 3, accuracy: 3, confidence: 3 });
  const [storyId, setStoryId] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const total = CRITERIA.reduce((a, k) => a + scores[k], 0);
  const average = (total / 5).toFixed(1);

  const save = async () => {
    if (!storyId) return toast.error("Please select a story.");
    setSaving(true);
    try {
      await api.post("/assessments", { studentId, storyId, ...scores, notes });
      toast.success("Assessment saved!");
      setNotes("");
      onSaved();
    } catch (err) { 
      console.error(err);
      toast.error("Could not save assessment."); 
    } finally { setSaving(false); }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" data-testid="assessment-form">
      <h2 className="font-heading text-xl font-bold text-slate-800">Reading Aloud Assessment</h2>
      <p className="mb-4 text-sm text-slate-400">Score each component from 1 to 5.</p>

      <div className="mb-4 max-w-xs">
        <Select value={storyId} onValueChange={setStoryId}>
          <SelectTrigger data-testid="assessment-story-select" className="rounded-2xl border-2"><SelectValue placeholder="Select a story" /></SelectTrigger>
          <SelectContent>
            {stories.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {CRITERIA.map((k) => (
          <div key={k} className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-bold text-slate-700">{LABELS[k]}</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setScores((s) => ({ ...s, [k]: n }))} data-testid={`rubric-${k}-${n}`}
                  className={cn("flex h-10 w-10 items-center justify-center rounded-xl border-2 font-bold transition-colors",
                    scores[k] >= n ? "border-sky-500 bg-sky-500 text-white" : "border-slate-200 text-slate-400 hover:border-sky-300")}>
                  {n
                }</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <div className="flex-1 rounded-2xl bg-sky-50 p-4 text-center">
          <div className="font-heading text-3xl font-bold text-sky-600" data-testid="assessment-total">{total}<span className="text-lg text-slate-400">/25</span></div>
          <div className="text-xs font-bold text-slate-505">Total Score</div>
        </div>
        <div className="flex-1 rounded-2xl bg-amber-50 p-4 text-center">
          <div className="font-heading text-3xl font-bold text-amber-600" data-testid="assessment-average">{average}<span className="text-lg text-slate-400">/5</span></div>
          <div className="text-xs font-bold text-slate-505">Average Score</div>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block font-bold text-slate-700">Teacher Notes</label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write feedback for this student..." data-testid="assessment-notes" className="rounded-2xl border-2" rows={3} />
      </div>

      <Button onClick={save} disabled={saving} data-testid="assessment-save" className="mt-4 rounded-full bg-slate-900 px-6 py-6 font-bold text-white hover:bg-slate-800">
        {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="mr-1.5 h-4 w-4" /> Save Assessment</>}
      </Button>

      {existing && existing.length > 0 && (
        <div className="mt-6 border-t border-slate-105 pt-4">
          <h3 className="mb-3 font-bold text-slate-700">Previous Assessments</h3>
          <div className="space-y-2">
            {existing.map((a, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-3 text-sm" data-testid={`saved-assessment-${i}`}>
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>{storyTitle(a.storyId)}</span>
                  <span className="text-sky-600">Avg {a.average}/5 · Total {a.total}/25</span>
                </div>
                {a.notes && <p className="mt-1 italic text-slate-500">"{a.notes}"</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
