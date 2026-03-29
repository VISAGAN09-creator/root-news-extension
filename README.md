# Root News — Bridging the Context Gap in Digital Media

> **"I can't go back to reading news the old way."**

---

## The Problem

News articles assume you already know the backstory. You don't. So you either abandon the article or go down a rabbit hole of Google tabs.

That's **Context Collapse** — and it's everywhere.

---

## The Idea

A single **"Root Info"** button inside any news article. Click it → an instant overlay explains the *foundational history* behind the story. No new tab. No page reload. You stay on the article.

---

## Why It's Different

Most AI tools hallucinate. Root News doesn't — because the AI is fed **exclusively from the publisher's own verified archives**, not the open web. The result is context you can actually trust.

---

## Technical Architecture

```
/
├── frontend/        # Chrome Extension (React + Vite + Tailwind CSS)
└── backend/         # REST API (Python FastAPI + Firebase Firestore + Gemini)
```

```
[Chrome Extension]
       │  POST /api/root-info  {"headline": "..."}
       ▼
[FastAPI Backend]
       ├──► [Firebase Firestore]   ← verified historical context
       └──► [Google Gemini API]    ← generates 3-bullet summary
```

---

## Backend Setup

### Requirements
- Python 3.9+
- Firebase project with Firestore enabled
- Google Cloud project with Gemini API access

### Environment Variables

```bash
GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-service-account.json
GEMINI_API_KEY=your_gemini_api_key_here
```

### Install & Run

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Server runs at `http://localhost:8000`.

### API

| Method | Endpoint | Payload | Response |
|--------|----------|---------|----------|
| `POST` | `/api/root-info` | `{"headline": "..."}` | 3-bullet historical context summary |

---

## Frontend Setup (Chrome Extension)

```bash
cd frontend
npm install
npm run build
```

### Load into Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked** → select `frontend/dist`

---

## Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/NewFeature`
3. Commit: `git commit -m 'Add NewFeature'`
4. Push: `git push origin feature/NewFeature`
5. Open a Pull Request

---

## License

MIT License. Built for PS-8: AI-Native News Experience by Kiruthika C G, Visagan G, and Yogender Kumar P.

GitHub: [root-news-extension](https://github.com/VISAGAN09-creator/root-news-extension)
