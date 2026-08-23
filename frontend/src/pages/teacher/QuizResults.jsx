import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreStars } from "@/components/ScoreStars";

export default function QuizResults() {
  const [quizzes, setQuizzes] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/quiz-results"), api.get("/stories")]).then(([q, s]) => {
      setQuizzes(q.data);
      setStories(s.data);
    });
  }, []);

  if (!quizzes) return <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 rounded-3xl" />)}</div>;

  const storyTitle = (sid) => stories.find((s) => s.id === sid)?.title || "Story";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Quiz Results</h1>
        <p className="text-slate-500">Track comprehension quiz scores completed by students.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Story</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Stars</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((q, idx) => {
                const stars = q.score === q.total ? 3 : q.score >= q.total - 1 ? 2 : 1;
                return (
                  <TableRow key={q.id} data-testid={`quiz-row-${idx}`}>
                    <TableCell className="font-bold text-slate-700">{q.studentName}</TableCell>
                    <TableCell className="font-medium text-slate-600">{storyTitle(q.storyId)}</TableCell>
                    <TableCell className="text-slate-400 text-xs">{new Date(q.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="font-bold text-amber-600">{q.score} / {q.total}</span>
                    </TableCell>
                    <TableCell>
                      <ScoreStars count={stars} total={3} size={20} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {!quizzes.length && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center font-bold text-slate-400">
                    No quiz results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
