import axios from "axios";
import { STORIES, CULTURE } from "./mockData"; // We will create this helper file

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

// Check if we are running in standalone mode (no backend connection)
let isStandalone = false;

// Custom request interceptor to dynamically handle API fallback
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("rlk_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // If already marked as standalone, intercept immediately
  if (isStandalone) {
    throw new axios.Cancel("SW_FALLBACK");
  }
  return config;
});

// Response interceptor to catch connection errors and trigger standalone fallback
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If request was canceled by us for fallback
    if (error.message === "SW_FALLBACK") {
      return handleLocalRequest(error.config);
    }

    // If backend connection fails (Network Error / Timeout / 503)
    if (!error.response || error.code === "ERR_NETWORK") {
      if (!isStandalone) {
        console.warn("FastAPI backend is unreachable. Switching to Standalone Browser Mode (LocalStorage DB).");
        isStandalone = true;
      }
      return handleLocalRequest(error.config);
    }
    return Promise.reject(error);
  }
);

// ---------------- LOCAL STORAGE DB ENGINE (STANDALONE PREVIEW) ----------------
const getLocal = (key, def = []) => JSON.parse(localStorage.getItem(key)) || def;
const setLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Initialize default users if empty
const initLocalDb = () => {
  const users = getLocal("rlk_db_users");
  if (!users.length) {
    const defaultUsers = [
      { id: "teacher-anna", username: "teacher", email: "teacher@readlocal.com", name: "Mrs. Anna", role: "teacher", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Anna" },
      { id: "student-maria", username: "student", email: "student@readlocal.com", name: "Maria", role: "student", grade: "Grade 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maria" },
      { id: "student-john", username: "john", email: "john@readlocal.com", name: "John", role: "student", grade: "Grade 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=John" },
      { id: "student-sarah", username: "sarah", email: "sarah@readlocal.com", name: "Sarah", role: "student", grade: "Grade 4", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" },
    ];
    setLocal("rlk_db_users", defaultUsers);
  }
};
initLocalDb();

async function handleLocalRequest(config) {
  const url = config.url.replace(/^\/?api\/?/, "");
  const method = config.method.toLowerCase();
  const body = config.data ? JSON.parse(config.data) : null;
  const token = localStorage.getItem("rlk_token");
  
  const users = getLocal("rlk_db_users");
  const currentUser = users.find((u) => u.id === token) || null;

  // Helper response builder
  const res = (data) => ({ data, status: 200, statusText: "OK", headers: {}, config });

  // 1. Auth routes
  if (url === "auth/login" && method === "post") {
    const { username, password } = body;
    const user = users.find((u) => u.username === username.toLowerCase());
    if (!user || password !== `${user.username}123`) {
      throw { response: { data: { detail: "Invalid demo credentials. Hint: use 'student' / 'student123'" } } };
    }
    localStorage.setItem("rlk_token", user.id);
    return res({ token: user.id, user });
  }

  if (url === "auth/me" && method === "get") {
    if (!currentUser) throw { response: { status: 401 } };
    return res(currentUser);
  }

  // 2. Stories & Culture
  if (url === "stories" && method === "get") {
    return res(STORIES);
  }

  if (url.startsWith("stories/") && method === "get") {
    const id = url.split("/")[1];
    const story = STORIES.find((s) => s.id === id);
    if (!story) throw { response: { status: 404 } };
    return res(story);
  }

  if (url === "culture" && method === "get") {
    return res(CULTURE);
  }

  // 3. Practices
  if (url === "practices" && method === "post") {
    const practices = getLocal("rlk_db_practices");
    const doc = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
      studentId: currentUser?.id || "student-maria",
      studentName: currentUser?.name || "Maria",
      date: new Date().toISOString(),
    };
    practices.unshift(doc);
    setLocal("rlk_db_practices", practices);
    return res(doc);
  }

  if (url === "practices" && method === "get") {
    const practices = getLocal("rlk_db_practices");
    if (currentUser?.role === "student") {
      return res(practices.filter((p) => p.studentId === currentUser.id));
    }
    const params = new URLSearchParams(config.url.split("?")[1]);
    const sid = params.get("studentId");
    if (sid) return res(practices.filter((p) => p.studentId === sid));
    return res(practices);
  }

  // 4. Quizzes
  if (url === "quiz-results" && method === "post") {
    const quizzes = getLocal("rlk_db_quizzes");
    const doc = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
      studentId: currentUser?.id || "student-maria",
      studentName: currentUser?.name || "Maria",
      date: new Date().toISOString(),
    };
    quizzes.unshift(doc);
    setLocal("rlk_db_quizzes", quizzes);
    return res(doc);
  }

  if (url === "quiz-results" && method === "get") {
    const quizzes = getLocal("rlk_db_quizzes");
    if (currentUser?.role === "student") {
      return res(quizzes.filter((q) => q.studentId === currentUser.id));
    }
    const params = new URLSearchParams(config.url.split("?")[1]);
    const sid = params.get("studentId");
    if (sid) return res(quizzes.filter((q) => q.studentId === sid));
    return res(quizzes);
  }

  // 5. Assessments
  if (url === "assessments" && method === "post") {
    const assessments = getLocal("rlk_db_assessments");
    const total = body.pronunciation + body.fluency + body.intonation + body.accuracy + body.confidence;
    const doc = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
      teacherName: currentUser?.name || "Mrs. Anna",
      total,
      average: Math.round((total / 5) * 10) / 10,
      date: new Date().toISOString(),
    };
    assessments.unshift(doc);
    setLocal("rlk_db_assessments", assessments);
    return res(doc);
  }

  if (url === "assessments" && method === "get") {
    const assessments = getLocal("rlk_db_assessments");
    const params = new URLSearchParams(config.url.split("?")[1]);
    const sid = params.get("studentId");
    if (sid) return res(assessments.filter((a) => a.studentId === sid));
    return res(assessments);
  }

  // 6. Student registration (POST /students)
  if (url === "students" && method === "post") {
    const usersList = getLocal("rlk_db_users");
    const existing = usersList.find((u) => u.username === body.username.toLowerCase());
    if (existing) throw { response: { data: { detail: "Username already exists" } } };
    
    const doc = {
      id: `student-${Math.random().toString(36).substr(2, 8)}`,
      username: body.username.toLowerCase(),
      name: body.name,
      role: "student",
      grade: body.grade,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${body.name}`,
    };
    usersList.push(doc);
    setLocal("rlk_db_users", usersList);
    return res(doc);
  }

  // 7. Student Analytics & Lists
  if (url === "students" && method === "get") {
    const studentUsers = users.filter((u) => u.role === "student");
    const enriched = studentUsers.map((s) => {
      const practices = getLocal("rlk_db_practices").filter((p) => p.studentId === s.id);
      const quizzes = getLocal("rlk_db_quizzes").filter((q) => q.studentId === s.id);
      const storiesCompleted = new Set(practices.map((p) => p.storyId)).size;
      const avgReading = practices.length ? Math.round(practices.reduce((a, p) => a + (p.fluencyScore + p.pronunciationScore) / 2, 0) / practices.length) : 0;
      const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizzes.length) : 0;
      return { ...s, storiesCompleted, readingPractices: practices.length, avgReading, avgQuiz };
    });
    return res(enriched);
  }

  if (url.startsWith("students/") && method === "get") {
    const sid = url.split("/")[1];
    const student = users.find((u) => u.id === sid);
    if (!student) throw { response: { status: 404 } };
    
    const practices = getLocal("rlk_db_practices").filter((p) => p.studentId === sid);
    const quizzes = getLocal("rlk_db_quizzes").filter((q) => q.studentId === sid);
    const assessments = getLocal("rlk_db_assessments").filter((a) => a.studentId === sid);
    
    const storiesCompleted = new Set(practices.map((p) => p.storyId)).size;
    const avgReading = practices.length ? Math.round(practices.reduce((a, p) => a + (p.fluencyScore + p.pronunciationScore) / 2, 0) / practices.length) : 0;
    const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizzes.length) : 0;
    
    return res({
      ...student,
      storiesCompleted,
      readingPractices: practices.length,
      avgReading,
      avgQuiz,
      practices,
      quizzes,
      assessments,
    });
  }

  // 8. Teacher Dashboard Summary
  if (url === "teacher/dashboard" && method === "get") {
    const studentUsers = users.filter((u) => u.role === "student");
    const enriched = studentUsers.map((s) => {
      const practices = getLocal("rlk_db_practices").filter((p) => p.studentId === s.id);
      const quizzes = getLocal("rlk_db_quizzes").filter((q) => q.studentId === s.id);
      const storiesCompleted = new Set(practices.map((p) => p.storyId)).size;
      const avgReading = practices.length ? Math.round(practices.reduce((a, p) => a + (p.fluencyScore + p.pronunciationScore) / 2, 0) / practices.length) : 0;
      const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizzes.length) : 0;
      return { ...s, storiesCompleted, readingPractices: practices.length, avgReading, avgQuiz };
    });
    
    const allPractices = getLocal("rlk_db_practices");
    const allQuizzes = getLocal("rlk_db_quizzes");
    const avgQuizScore = allQuizzes.length ? Math.round(allQuizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / allQuizzes.length) : 0;

    return res({
      totalStudents: studentUsers.length,
      storiesAvailable: STORIES.length,
      readingPractices: allPractices.length,
      avgQuizScore,
      students: enriched,
    });
  }

  // 9. Teacher Evaluation
  if (url === "teacher/evaluation" && method === "get") {
    const studentUsers = users.filter((u) => u.role === "student");
    const enriched = studentUsers.map((s) => {
      const practices = getLocal("rlk_db_practices").filter((p) => p.studentId === s.id);
      const quizzes = getLocal("rlk_db_quizzes").filter((q) => q.studentId === s.id);
      const storiesCompleted = new Set(practices.map((p) => p.storyId)).size;
      const avgReading = practices.length ? Math.round(practices.reduce((a, p) => a + (p.fluencyScore + p.pronunciationScore) / 2, 0) / practices.length) : 0;
      const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / quizzes.length) : 0;
      return { ...s, storiesCompleted, readingPractices: practices.length, avgReading, avgQuiz };
    });

    const allPractices = getLocal("rlk_db_practices");
    const allQuizzes = getLocal("rlk_db_quizzes");
    
    const avgQuizScore = allQuizzes.length ? Math.round(allQuizzes.reduce((a, q) => a + (q.score / q.total) * 100, 0) / allQuizzes.length) : 0;
    const avgReadingScore = enriched.length ? Math.round(enriched.reduce((a, s) => a + s.avgReading, 0) / enriched.length) : 0;
    const completionRate = enriched.length ? Math.round(enriched.reduce((a, s) => a + s.storiesCompleted, 0) / (enriched.length * STORIES.length) * 100) : 0;

    return res({
      numStudents: studentUsers.length,
      numSessions: allPractices.length,
      avgReadingScore,
      avgQuizScore,
      completionRate,
      rows: enriched,
    });
  }

  throw { response: { status: 404 } };
}

export function formatApiError(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
