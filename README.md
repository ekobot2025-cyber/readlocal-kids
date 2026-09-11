<div align="center">

# 📚 ReadLocal Kids
### **Papuan Reading Aloud & Cultural Discovery Platform**
*"Read English · Discover Culture — From Papua to the World"*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 🌟 Overview

**ReadLocal Kids** is an interactive, culturally contextualized digital English reading platform developed specifically for elementary school learners in Papua, Indonesia. By marrying **Papuan indigenous folk stories, traditional ecological knowledge, and cultural heritage** with modern **speech recognition and pronunciation assessment**, ReadLocal Kids empowers young learners to master oral reading fluency in English while nurturing deep pride in their local heritage.

> **Research Lead & Author**: **Dr. Yulini Rinantanti, M. Ed.**  
> *Dedicated to advancing literacy and joyful language acquisition across Papua.*

---

## ✨ Key Features

### 📖 1. 26 Culturally Contextualized Papuan Stories
- Graded reading levels tailored for elementary students (**Grade 1–2**, **Grade 3–4**, and **Grade 5–6**).
- Themes covering Papuan wildlife (*Cenderawasih, Kasuari*), traditional crafts (*Noken, Honai*), maritime wisdom (*Biak, Raja Ampat*), food heritage (*Papeda, Sagu*), and community harmony (*Bakar Batu, Yospan*).
- Vibrant, high-definition illustrations accompanying every chapter.

### 🎙️ 2. Interactive Read Aloud & Real-Time Speech Assessment
- **Sentence-by-Sentence Narration**: Audio playback with customizable speed settings (*Slow 0.7x*, *Normal 1.0x*, *Fast 1.25x*).
- **Oral Reading Recording**: Live microphone capture with real-time word-by-word pronunciation alignment.
- **Visual Accuracy Feedback**: Words are dynamically color-coded (Green: Accurate, Amber: Near-match, Gray: Skipped) with overall fluency and confidence scores.
- **Tap-a-Word Pronunciation**: Students can tap any word in the text to hear instant audio pronunciation.

### 🔊 3. Dual-Accent Vocabulary Builder (120 Words · 625+ Audio Files)
- **100% Pre-Generated Audio**: Every vocabulary word includes zero-latency audio in both **🇬🇧 UK Accent** and **🇺🇸 US Accent**.
- Child-friendly definitions, example sentences, and illustration cards.
- Integrated audio playback with automatic cleanup and fail-safe speech synthesis fallback.

### 🎯 4. Interactive Story Comprehension Quizzes
- Three to four multiple-choice comprehension questions at the end of each story.
- Immediate visual and auditory feedback (Checkmark/Cross).
- Star rating calculation (1 to 3 Stars) automatically saved to the student’s learning portfolio.

### 🎮 5. Gamified Language Activities
- **Match the Picture**: Connect Papuan cultural terms with authentic visual photos.
- **Arrange the Sentence**: Reorder scrambled words to form correct English sentences.
- **Missing Word**: Fill in vocabulary blanks based on context.

### 📜 6. Canva Design School Standard Certificate
- **A4 Landscape Layout (297mm × 210mm)** adhering to international design school standards.
- Features a **3D gold scalloped medal badge**, celebratory confetti, and Papuan cultural artwork.
- **Print-Safe Technology**: Utilizes native document image elements (`<img>`) so that certificates print in **full vibrant color**, even when browser "Background graphics" is disabled.
- **Verifiable Digital QR Code**: Authentic verification link for teachers, parents, and schools.

### 👨‍🏫 7. Comprehensive Teacher & Evaluator Dashboard
- **Classroom Progress Tracking**: Monitor reading minutes, completed stories, and quiz averages.
- **Audio Playback of Student Recordings**: Teachers can listen back to student recordings directly from the dashboard.
- **Standardized Evaluation Rubrics**: Pre-formatted grading criteria for oral reading fluency, accuracy, and comprehension.
- **Data Export**: Export student evaluation records to CSV for reporting.

### ⚡ 8. Zero-Lag Standalone Mode & Offline Resilience
- Automatically detects backend server connectivity; seamlessly switches to an internal **LocalStorage DB Engine** with zero lag or freezing if offline.
- Ideal for remote schools or areas with intermittent internet access.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend Framework** | **React 19** + **Vite 8** | Ultra-fast SPA with Hot Module Replacement |
| **Styling & UI** | **Tailwind CSS 3.4** + **shadcn/ui** | Responsive, mobile-first design with accessible components |
| **Animations** | **Framer Motion 11** | Smooth card flips, transitions, and celebration effects |
| **Icons & Media** | **Lucide React** | Consistent, lightweight SVG iconography |
| **Data Visualization**| **Recharts** | Weekly activity charts and student score distribution |
| **Audio Engine** | **HTML5 Audio API** + **gTTS** | High-fidelity MP3 pre-rendered audio + Web Speech API fallback |
| **Backend API** | **FastAPI (Python 3.11+)** | Asynchronous REST API endpoints |
| **Database** | **MongoDB / Motor** + **Local JSON** | Dual storage: Cloud MongoDB with local JSON fallback |
| **Authentication** | **PyJWT** + **Bcrypt** | Secure token-based authentication with role separation |

---

## 📁 Project Structure

```text
readlocal_kids/
├── backend/
│   ├── server.py              # FastAPI application server & REST routes
│   ├── seed_data.py           # Database seeder with 26 stories & vocabularies
│   ├── requirements.txt       # Python backend dependencies
│   ├── db.json                # Local fallback database
│   └── .env                   # Environment variables (PORT, MONGO_URL, JWT_SECRET)
│
├── frontend/
│   ├── public/
│   │   ├── audio/
│   │   │   ├── vocab/         # 314+ MP3 files for vocabulary (UK & US accents)
│   │   │   └── stories/       # 311+ MP3 files for story sentence audio
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/        # Reusable UI (CertificateModal, StoryCard, Navbar, etc.)
│   │   ├── context/           # AuthContext (Student & Teacher roles)
│   │   ├── hooks/             # Custom hooks (useStoryAudio, useAudioPlayer, useRecorder)
│   │   ├── lib/               # API client, Mock database engine, and utilities
│   │   ├── pages/
│   │   │   ├── student/       # Student Home, Stories, StoryReader, Practice, Games, Progress
│   │   │   └── teacher/       # Dashboard, StoryLibrary, ReadingResults, Evaluation
│   │   ├── App.jsx            # Main route definition
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies & scripts
│   ├── tailwind.config.js     # Tailwind design system configuration
│   └── vite.config.js         # Vite configuration
│
└── README.md                  # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 18.x or higher & **npm**
- **Python** 3.10 or higher & **pip**
- *(Optional)* **MongoDB** (Local instance or MongoDB Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/ekobot2025-cyber/readlocal-kids.git
cd readlocal_kids
```

---

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend will be live at `http://localhost:5173`.

---

### 3. Backend Setup *(Optional for Full Multi-Device Sync)*
> *Note: If the backend is not running, ReadLocal Kids automatically operates in **Standalone Mode** using its client-side database.*

```bash
# Open a new terminal and navigate to backend
cd backend

# Create and activate a virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt

# Seed the initial database (26 stories, users, vocabularies)
python seed_data.py

# Start the FastAPI server
uvicorn server:app --reload --port 8000
```
Backend API will be accessible at `http://localhost:8000` (Swagger docs at `/docs`).

---

## 👥 Default Demo Credentials

You can test the application using the pre-configured demo accounts:

| Role | Username | Password | Notes |
|---|---|---|---|
| **Student** | `student` | `student123` | Access to 26 stories, practice, games, & certificates |
| **Teacher** | `teacher` | `teacher123` | Access to student analytics, class results, & evaluation rubrics |

---

## 📦 Production Build

To produce an optimized production build of the frontend:
```bash
cd frontend
npm run build
```
The compiled static assets will be output to `frontend/dist/`, ready for deployment to **Vercel**, **Netlify**, **Cloudflare Pages**, or any static web host.

---

## 📜 Research & Citation

If you use or reference ReadLocal Kids in educational research, literacy interventions, or academic publications, please cite:

```bibtex
@misc{rinantanti2026readlocal,
  author    = {Dr. Yulini Rinantanti, M. Ed.},
  title     = {ReadLocal Kids: Papuan Reading Aloud & Cultural Discovery Digital Learning Platform},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://github.com/ekobot2025-cyber/readlocal-kids}
}
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ for the children and educators of Papua.</sub>
</div>
