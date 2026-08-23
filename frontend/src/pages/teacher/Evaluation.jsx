import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Info, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Evaluation() {
  const [data, setData] = useState(null);

  const load = () => {
    api.get("/teacher/evaluation").then((r) => setData(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleExport = () => {
    window.open(`${api.defaults.baseURL}/teacher/evaluation/export`, "_blank");
    toast.success("CSV export triggered!");
  };

  if (!data) return <Skeleton className="h-96 rounded-3xl" />;

  const metrics = [
    { label: "Number of Students", value: data.numStudents },
    { label: "Reading Sessions", value: data.numSessions },
    { label: "Avg Reading Score", value: `${data.avgReadingScore}%` },
    { label: "Avg Quiz Score", value: `${data.avgQuizScore}%` },
    { label: "Completion Rate", value: `${data.completionRate}%` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-800">Learning Evaluation</h1>
          <p className="text-slate-500">View research-oriented metrics and export implementation reports.</p>
        </div>
        <Button onClick={handleExport} data-testid="export-csv-btn" className="rounded-full bg-slate-900 font-bold text-white hover:bg-slate-800">
          <Download className="mr-1.5 h-4 w-4" /> Export Results (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((m, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="font-heading text-3xl font-bold text-sky-600">{m.value}</div>
            <div className="text-xs font-bold text-slate-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-800">Evaluation Records</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Stories Completed</TableHead>
                <TableHead>Reading Practices</TableHead>
                <TableHead>Avg Reading Score</TableHead>
                <TableHead>Avg Quiz Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-bold text-slate-700">{row.name}</TableCell>
                  <TableCell className="text-slate-500">{row.grade}</TableCell>
                  <TableCell className="font-bold text-slate-600">{row.storiesCompleted}</TableCell>
                  <TableCell className="font-medium text-slate-500">{row.readingPractices}</TableCell>
                  <TableCell><span className="font-bold text-sky-600">{row.avgReading}%</span></TableCell>
                  <TableCell><span className="font-bold text-amber-600">{row.avgQuiz}%</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex gap-3 text-sm text-amber-800">
        <Info className="h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <h4 className="font-bold">Research Mode Note</h4>
          <p className="mt-1 leading-relaxed">
            This module generates metrics suitable for educational action research (Penelitian Tindakan Kelas). 
            Exported data tracks Reading Fluency improvements and Reading Comprehension scores across Papuan culture story sets.
          </p>
        </div>
      </div>
    </div>
  );
}
