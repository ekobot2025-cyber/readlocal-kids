import "@/App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import { StudentLayout } from "@/components/StudentLayout";
import { TeacherLayout } from "@/components/TeacherLayout";

import StudentHome from "@/pages/student/Home";
import Stories from "@/pages/student/Stories";
import StoryReader from "@/pages/student/StoryReader";
import Practice from "@/pages/student/Practice";
import Games from "@/pages/student/Games";
import StudentProgress from "@/pages/student/Progress";
import Discover from "@/pages/student/Discover";

import TeacherDashboard from "@/pages/teacher/Dashboard";
import StoryLibrary from "@/pages/teacher/StoryLibrary";
import Students from "@/pages/teacher/Students";
import StudentProfile from "@/pages/teacher/StudentProfile";
import ReadingResults from "@/pages/teacher/ReadingResults";
import QuizResults from "@/pages/teacher/QuizResults";
import ClassProgress from "@/pages/teacher/Progress";
import Evaluation from "@/pages/teacher/Evaluation";
import Guide from "@/pages/teacher/Guide";
import TeacherSettings from "@/pages/teacher/Settings";

function FullLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
    </div>
  );
}

function Protected({ role, children }) {
  const { user, loading } = useAuth();
  if (loading || user === null) return <FullLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "teacher" ? "/teacher" : "/app"} replace />;
  }
  return children;
}

function StudentRoute({ children }) {
  return (
    <Protected role="student">
      <StudentLayout>{children}</StudentLayout>
    </Protected>
  );
}

function TeacherRoute({ children }) {
  return (
    <Protected role="teacher">
      <TeacherLayout>{children}</TeacherLayout>
    </Protected>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route path="/app" element={<StudentRoute><StudentHome /></StudentRoute>} />
            <Route path="/app/stories" element={<StudentRoute><Stories /></StudentRoute>} />
            <Route path="/app/story/:id" element={<StudentRoute><StoryReader /></StudentRoute>} />
            <Route path="/app/practice" element={<StudentRoute><Practice /></StudentRoute>} />
            <Route path="/app/games" element={<StudentRoute><Games /></StudentRoute>} />
            <Route path="/app/progress" element={<StudentRoute><StudentProgress /></StudentRoute>} />
            <Route path="/app/discover" element={<StudentRoute><Discover /></StudentRoute>} />

            <Route path="/teacher" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
            <Route path="/teacher/stories" element={<TeacherRoute><StoryLibrary /></TeacherRoute>} />
            <Route path="/teacher/students" element={<TeacherRoute><Students /></TeacherRoute>} />
            <Route path="/teacher/student/:id" element={<TeacherRoute><StudentProfile /></TeacherRoute>} />
            <Route path="/teacher/reading" element={<TeacherRoute><ReadingResults /></TeacherRoute>} />
            <Route path="/teacher/quiz" element={<TeacherRoute><QuizResults /></TeacherRoute>} />
            <Route path="/teacher/progress" element={<TeacherRoute><ClassProgress /></TeacherRoute>} />
            <Route path="/teacher/evaluation" element={<TeacherRoute><Evaluation /></TeacherRoute>} />
            <Route path="/teacher/guide" element={<TeacherRoute><Guide /></TeacherRoute>} />
            <Route path="/teacher/settings" element={<TeacherRoute><TeacherSettings /></TeacherRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </div>
  );
}

export default App;
