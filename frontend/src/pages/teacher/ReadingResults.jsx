import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic, ArrowRight } from "lucide-react";

export default function ReadingResults() {
  const [practices, setPractices] = useState(null);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get("/practices"), api.get("/stories")]).then(([p, s]) => {
      setPractices(p.data);
      setStories(s.data);
    });
  }, []);

  if (!practices) return <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 rounded-3xl" />)}</div>;

  const storyTitle = (sid) => stories.find((s) => s.id === sid)?.title || "Story";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-slate-800">Reading Results</h1>
        <p className="text-slate-500">Listen to student voice recordings and view automated reading feedback.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Story</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fluency</TableHead>
                <TableHead>Pronunciation</TableHead>
                <TableHead>Recording</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {practices.map((p, idx) => (
                <TableRow key={p.id} data-testid={`reading-row-${idx}`}>
                  <TableCell className="font-bold text-slate-700">{p.studentName}</TableCell>
                  <TableCell className="font-medium text-slate-600">{storyTitle(p.storyId)}</TableCell>
                  <TableCell className="text-slate-400 text-xs">{new Date(p.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-slate-500 font-bold">{p.duration}s</TableCell>
                  <TableCell><span className="font-bold text-sky-600">{p.fluencyScore}%</span></TableCell>
                  <TableCell><span className="font-bold text-green-600">{p.pronunciationScore}%</span></TableCell>
                  <TableCell>
                    {p.recording ? (
                      <audio src={p.recording} controls className="h-9 w-44" data-testid={`audio-${p.id}`} />
                    ) : (
                      <span className="text-xs text-slate-400 font-bold">No audio</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/teacher/student/${p.studentId}`)}
                      size="sm"
                      variant="outline"
                      data-testid={`assess-${p.id}`}
                      className="rounded-full font-bold"
                    >
                      Assess <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!practices.length && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center font-bold text-slate-400">
                    No reading practices found.
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
