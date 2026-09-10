from dotenv import load_dotenv
from pathlib import Path
import os
import json
import logging
import io
import csv
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.responses import PlainTextResponse
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import bcrypt
import jwt

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("readlocal")

# ---------------- Mock MongoDB Fallback ----------------
class AsyncCursor:
    def __init__(self, data):
        self._data = data
        self._sort_key = None
        self._sort_dir = 1
        
    def sort(self, key, direction=-1):
        self._sort_key = key
        if direction == -1 or direction == "desc" or direction == "-1":
            self._sort_dir = -1
        else:
            self._sort_dir = 1
        return self
        
    async def to_list(self, length=None):
        res = list(self._data)
        if self._sort_key:
            res.sort(key=lambda x: x.get(self._sort_key, ""), reverse=(self._sort_dir == -1))
        if length:
            res = res[:length]
        return res

class MockCollection:
    def __init__(self, name, db):
        self.name = name
        self.db = db
        
    def _get_data(self):
        return self.db._load().setdefault(self.name, [])
        
    def _save_data(self, data):
        db_data = self.db._load()
        db_data[self.name] = data
        self.db._save(db_data)
        
    async def find_one(self, query, projection=None):
        data = self._get_data()
        for doc in data:
            match = True
            for k, v in query.items():
                if k == "$or" and isinstance(v, list):
                    or_match = False
                    for cond in v:
                        cond_match = True
                        for ck, cv in cond.items():
                            if doc.get(ck) != cv:
                                cond_match = False
                        if cond_match:
                            or_match = True
                            break
                    if not or_match:
                        match = False
                elif doc.get(k) != v:
                    match = False
            if match:
                res = dict(doc)
                if projection:
                    res = {pk: pv for pk, pv in res.items() if projection.get(pk, 1) != 0}
                return res
        return None
        
    def find(self, query=None, projection=None):
        query = query or {}
        data = self._get_data()
        results = []
        for doc in data:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
            if match:
                res = dict(doc)
                if projection:
                    res = {pk: pv for pk, pv in res.items() if projection.get(pk, 1) != 0}
                results.append(res)
        return AsyncCursor(results)
        
    async def insert_one(self, doc):
        data = self._get_data()
        doc_copy = dict(doc)
        if "_id" in doc_copy:
            doc_copy.pop("_id")
        data.append(doc_copy)
        self._save_data(data)
        return doc_copy
        
    async def update_one(self, query, update, upsert=False):
        data = self._get_data()
        found = False
        for idx, doc in enumerate(data):
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
            if match:
                found = True
                new_doc = dict(doc)
                if "$set" in update:
                    new_doc.update(update["$set"])
                if "$setOnInsert" in update:
                    # It already exists, so don't apply $setOnInsert
                    pass
                data[idx] = new_doc
                self._save_data(data)
                break
        if not found and upsert:
            new_doc = {}
            if "$set" in update:
                new_doc.update(update["$set"])
            if "$setOnInsert" in update:
                new_doc.update(update["$setOnInsert"])
            new_doc.update(query)
            data.append(new_doc)
            self._save_data(data)
            
    async def count_documents(self, query):
        cursor = self.find(query)
        res = await cursor.to_list()
        return len(res)

class MockDatabase:
    def __init__(self, filepath):
        self.filepath = filepath
        
    def _load(self):
        try:
            if os.path.exists(self.filepath):
                with open(self.filepath, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.error(f"Error loading mock db: {e}")
        return {}
            
    def _save(self, data):
        try:
            with open(self.filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, default=str, indent=2)
        except Exception as e:
            logger.error(f"Error saving mock db: {e}")
            
    def __getattr__(self, name):
        return MockCollection(name, self)
        
    def close(self):
        pass

# Initialize DB with fallback
is_mock = True
db = None
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'readlocal_kids')

try:
    from motor.motor_asyncio import AsyncIOMotorClient
    from pymongo import MongoClient
    # Test connection
    temp_client = MongoClient(mongo_url, serverSelectionTimeoutMS=1000)
    temp_client.server_info()
    temp_client.close()
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    is_mock = False
    logger.info("Successfully connected to MongoDB. Using Mongo DB storage.")
except Exception as e:
    logger.warning(f"Could not connect to MongoDB. Falling back to JSON MockDatabase. Detail: {e}")
    db = MockDatabase(ROOT_DIR / "db.json")

# Import seed data helpers
from seed_data import STORIES, CULTURE, student_profile

JWT_SECRET = os.environ.get('JWT_SECRET', '17aba482c8070d4a0bdd5eb81313070336dc7013015467c9d86757ebfb1102e8')
JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------------- Auth helpers ----------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ---------------- Models ----------------
class LoginInput(BaseModel):
    username: str
    password: str

class PracticeInput(BaseModel):
    storyId: str
    duration: int = 0
    attempt: int = 1
    recording: Optional[str] = None  # base64 data url (optional)
    fluencyScore: int = 0
    pronunciationScore: int = 0
    confidenceScore: int = 0
    completionScore: int = 100

class QuizInput(BaseModel):
    storyId: str
    score: int
    total: int

class AssessmentInput(BaseModel):
    studentId: str
    storyId: str
    pronunciation: int
    fluency: int
    intonation: int
    accuracy: int
    confidence: int
    notes: str = ""

class StudentCreateInput(BaseModel):
    name: str
    username: str
    password: str
    grade: str = "Grade 4"

class StudentPasswordResetInput(BaseModel):
    new_password: str

class RegisterInput(BaseModel):
    name: str
    username: str
    password: str
    role: str = "student"
    grade: Optional[str] = "Grade 4"
    teacher_code: Optional[str] = None

# ---------------- Auth routes ----------------
@api_router.post("/auth/login")
async def login(data: LoginInput):
    uname = data.username.strip().lower()
    user = await db.users.find_one({"$or": [{"username": uname}, {"email": uname}]})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_token(user["id"])
    user_copy = dict(user)
    user_copy.pop("_id", None)
    user_copy.pop("password_hash", None)
    return {"token": token, "user": user_copy}

@api_router.post("/auth/register")
async def register(data: RegisterInput):
    uname = data.username.strip().lower()
    existing = await db.users.find_one({"username": uname})
    if existing:
        raise HTTPException(status_code=400, detail="Username is already taken")
    
    if data.role == "teacher":
        expected_code = os.environ.get("TEACHER_PASSCODE", "TEACHER2026")
        if not data.teacher_code or data.teacher_code.strip() != expected_code:
            raise HTTPException(status_code=403, detail="Invalid Teacher Passcode. Please contact school administration.")

    user_id = f"{data.role}-{uuid.uuid4().hex[:8]}"
    doc = {
        "id": user_id,
        "name": data.name.strip(),
        "username": uname,
        "email": f"{uname}@readlocal.com",
        "password_hash": hash_password(data.password),
        "role": data.role,
        "grade": data.grade if data.role == "student" else None,
        "avatar": f"https://api.dicebear.com/7.x/adventurer/svg?seed={data.name.strip()}"
    }
    await db.users.insert_one(doc)
    token = create_token(user_id)
    doc_copy = dict(doc)
    doc_copy.pop("_id", None)
    doc_copy.pop("password_hash", None)
    return {"token": token, "user": doc_copy}

@api_router.get("/auth/me")
async def me(current=Depends(get_current_user)):
    return current

# ---------------- Stories ----------------
@api_router.get("/stories")
async def list_stories():
    return await db.stories.find({}, {"_id": 0}).to_list(1000)

@api_router.get("/stories/{story_id}")
async def get_story(story_id: str):
    story = await db.stories.find_one({"id": story_id}, {"_id": 0})
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story

@api_router.get("/culture")
async def list_culture():
    return CULTURE

# ---------------- Reading practices ----------------
@api_router.post("/practices")
async def create_practice(data: PracticeInput, current=Depends(get_current_user)):
    doc = data.model_dump()
    doc.update({
        "id": str(uuid.uuid4()),
        "studentId": current["id"],
        "studentName": current["name"],
        "date": datetime.now(timezone.utc).isoformat(),
    })
    await db.practices.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.get("/practices")
async def get_practices(studentId: Optional[str] = None, current=Depends(get_current_user)):
    query = {}
    if current["role"] == "student":
        query["studentId"] = current["id"]
    elif studentId:
        query["studentId"] = studentId
    return await db.practices.find(query, {"_id": 0}).sort("date", -1).to_list(1000)

@api_router.get("/practices/{practice_id}")
async def get_practice(practice_id: str, current=Depends(get_current_user)):
    p = await db.practices.find_one({"id": practice_id}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    return p

# ---------------- Quiz results ----------------
@api_router.post("/quiz-results")
async def create_quiz(data: QuizInput, current=Depends(get_current_user)):
    doc = data.model_dump()
    doc.update({
        "id": str(uuid.uuid4()),
        "studentId": current["id"],
        "studentName": current["name"],
        "date": datetime.now(timezone.utc).isoformat(),
    })
    await db.quiz_results.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.get("/quiz-results")
async def get_quizzes(studentId: Optional[str] = None, current=Depends(get_current_user)):
    query = {}
    if current["role"] == "student":
        query["studentId"] = current["id"]
    elif studentId:
        query["studentId"] = studentId
    return await db.quiz_results.find(query, {"_id": 0}).sort("date", -1).to_list(1000)

# ---------------- Teacher assessments ----------------
@api_router.post("/assessments")
async def create_assessment(data: AssessmentInput, current=Depends(get_current_user)):
    if current["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Teachers only")
    doc = data.model_dump()
    total = data.pronunciation + data.fluency + data.intonation + data.accuracy + data.confidence
    doc.update({
        "id": str(uuid.uuid4()),
        "teacherName": current["name"],
        "total": total,
        "average": round(total / 5, 1),
        "date": datetime.now(timezone.utc).isoformat(),
    })
    await db.assessments.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.get("/assessments")
async def get_assessments(studentId: Optional[str] = None, current=Depends(get_current_user)):
    query = {}
    if studentId:
        query["studentId"] = studentId
    return await db.assessments.find(query, {"_id": 0}).sort("date", -1).to_list(1000)

# ---------------- Students & teacher analytics ----------------
async def _student_stats(student):
    sid = student["id"]
    practices = await db.practices.find({"studentId": sid}, {"_id": 0}).to_list(1000)
    quizzes = await db.quiz_results.find({"studentId": sid}, {"_id": 0}).to_list(1000)
    stories_done = len({p["storyId"] for p in practices})
    
    avg_reading = 0
    if practices:
        avg_reading = round(sum((p.get("fluencyScore", 0) + p.get("pronunciationScore", 0)) / 2 for p in practices) / len(practices))
        
    avg_quiz = 0
    if quizzes:
        avg_quiz = round(sum((q["score"] / q["total"]) * 100 for q in quizzes) / len(quizzes))
        
    return {
        **student,
        "storiesCompleted": stories_done,
        "readingPractices": len(practices),
        "avgReading": avg_reading,
        "avgQuiz": avg_quiz,
    }

@api_router.get("/students")
async def list_students(current=Depends(get_current_user)):
    students = await db.users.find({"role": "student"}, {"_id": 0, "password_hash": 0}).to_list(1000)
    return [await _student_stats(s) for s in students]

@api_router.post("/students")
async def create_student(data: StudentCreateInput, current=Depends(get_current_user)):
    if current["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Teachers only")
    uname = data.username.strip().lower()
    existing = await db.users.find_one({"$or": [{"username": uname}, {"email": f"{uname}@readlocal.com"}]})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    uid = f"student-{uuid.uuid4().hex[:8]}"
    prof = student_profile(uid, data.name.strip(), uname)
    prof["username"] = uname
    prof["email"] = f"{uname}@readlocal.com"
    prof["password_hash"] = hash_password(data.password)
    prof["grade"] = data.grade
    await db.users.insert_one(prof)
    prof.pop("_id", None)
    prof.pop("password_hash", None)
    return prof

@api_router.put("/students/{student_id}/password")
async def reset_student_password(student_id: str, data: StudentPasswordResetInput, current=Depends(get_current_user)):
    if current["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Teachers only")
    student = await db.users.find_one({"id": student_id, "role": "student"})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    new_pw = data.new_password.strip()
    if not new_pw or len(new_pw) < 4:
        raise HTTPException(status_code=400, detail="Password must be at least 4 characters")
    await db.users.update_one(
        {"id": student_id},
        {"$set": {"password_hash": hash_password(new_pw)}}
    )
    return {"message": "Password updated successfully"}

@api_router.get("/students/{student_id}")
async def student_detail(student_id: str, current=Depends(get_current_user)):
    student = await db.users.find_one({"id": student_id}, {"_id": 0, "password_hash": 0})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    stats = await _student_stats(student)
    stats["practices"] = await db.practices.find({"studentId": student_id}, {"_id": 0}).sort("date", -1).to_list(100)
    stats["quizzes"] = await db.quiz_results.find({"studentId": student_id}, {"_id": 0}).sort("date", -1).to_list(100)
    stats["assessments"] = await db.assessments.find({"studentId": student_id}, {"_id": 0}).sort("date", -1).to_list(100)
    return stats

@api_router.get("/teacher/dashboard")
async def teacher_dashboard(current=Depends(get_current_user)):
    students = await db.users.find({"role": "student"}, {"_id": 0, "password_hash": 0}).to_list(1000)
    enriched = [await _student_stats(s) for s in students]
    total_practices = await db.practices.count_documents({})
    total_stories = await db.stories.count_documents({})
    quizzes = await db.quiz_results.find({}, {"_id": 0}).to_list(1000)
    avg_quiz = round(sum((q["score"] / q["total"]) * 100 for q in quizzes) / len(quizzes)) if quizzes else 0
    return {
        "totalStudents": len(students),
        "storiesAvailable": total_stories,
        "readingPractices": total_practices,
        "avgQuizScore": avg_quiz,
        "students": enriched,
    }

@api_router.get("/teacher/evaluation")
async def evaluation(current=Depends(get_current_user)):
    students = await db.users.find({"role": "student"}, {"_id": 0, "password_hash": 0}).to_list(1000)
    enriched = [await _student_stats(s) for s in students]
    total_stories = await db.stories.count_documents({})
    sessions = await db.practices.count_documents({})
    quizzes = await db.quiz_results.find({}, {"_id": 0}).to_list(1000)
    avg_quiz = round(sum((q["score"] / q["total"]) * 100 for q in quizzes) / len(quizzes)) if quizzes else 0
    avg_reading = round(sum(s["avgReading"] for s in enriched) / len(enriched)) if enriched else 0
    completion = round(sum(s["storiesCompleted"] for s in enriched) / (len(enriched) * total_stories) * 100) if enriched and total_stories else 0
    return {
        "numStudents": len(students),
        "numSessions": sessions,
        "avgReadingScore": avg_reading,
        "avgQuizScore": avg_quiz,
        "completionRate": completion,
        "rows": enriched,
    }

@api_router.get("/teacher/evaluation/export")
async def evaluation_export():
    students = await db.users.find({"role": "student"}, {"_id": 0, "password_hash": 0}).to_list(1000)
    enriched = [await _student_stats(s) for s in students]
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Student", "Grade", "Stories Completed", "Reading Practices", "Avg Reading Score", "Avg Quiz Score"])
    for s in enriched:
        writer.writerow([s["name"], s.get("grade", ""), s["storiesCompleted"], s["readingPractices"], s["avgReading"], s["avgQuiz"]])
    return PlainTextResponse(
        output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=readlocal_evaluation.csv"},
    )

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Seeding ----------------
async def seed():
    # Stories (upsert to keep fresh)
    for s in STORIES:
        await db.stories.update_one({"id": s["id"]}, {"$set": s}, upsert=True)

    # Users
    teacher = {
        "id": "teacher-anna", "username": "teacher", "email": "teacher@readlocal.com",
        "name": "Mrs. Anna", "role": "teacher",
        "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=Anna",
        "password_hash": hash_password("teacher123"),
    }
    await db.users.update_one({"id": teacher["id"]}, {"$setOnInsert": teacher}, upsert=True)

    students_seed = [
        ("student-maria", "Maria", "student", "student123"),
        ("student-john", "John", "john", "john123"),
        ("student-sarah", "Sarah", "sarah", "sarah123"),
        ("student-david", "David", "david", "david123"),
        ("student-lisa", "Lisa", "lisa", "lisa123"),
        ("student-peter", "Peter", "peter", "peter123"),
    ]
    for uid, name, uname, pwd in students_seed:
        prof = student_profile(uid, name, uname)
        prof["username"] = uname
        prof["email"] = f"{uname}@readlocal.com"
        prof["password_hash"] = hash_password(pwd)
        await db.users.update_one({"id": uid}, {"$setOnInsert": prof}, upsert=True)

    # Demo activity (only once)
    if await db.practices.count_documents({}) == 0:
        import random
        story_ids = [s["id"] for s in STORIES]
        names = {uid: name for uid, name, _, _ in students_seed}
        for uid, name in names.items():
            n = random.randint(4, 8)
            for i in range(n):
                sid = random.choice(story_ids)
                fl = random.randint(75, 95)
                pr = random.randint(72, 94)
                d = (datetime.now(timezone.utc) - timedelta(days=random.randint(0, 6))).isoformat()
                await db.practices.insert_one({
                    "id": str(uuid.uuid4()), "studentId": uid, "studentName": name,
                    "storyId": sid, "date": d, "duration": random.randint(20, 60),
                    "attempt": 1, "recording": None,
                    "fluencyScore": fl, "pronunciationScore": pr,
                    "confidenceScore": random.randint(80, 96), "completionScore": 100,
                })
            for i in range(random.randint(3, 6)):
                sid = random.choice(story_ids)
                await db.quiz_results.insert_one({
                    "id": str(uuid.uuid4()), "studentId": uid, "studentName": name,
                    "storyId": sid, "score": random.randint(2, 3), "total": 3,
                    "date": (datetime.now(timezone.utc) - timedelta(days=random.randint(0, 6))).isoformat(),
                })
    logger.info("Seeding complete")

@app.on_event("startup")
async def startup():
    await seed()

@app.on_event("shutdown")
async def shutdown():
    if hasattr(db, "close"):
        db.close()
