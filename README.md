# 🚀 AI-Powered Job Management System

A full-stack job discovery and job posting platform built with **Next.js**, **Express.js**, **MongoDB**, **BullMQ + Redis**, and **Groq AI**.

> **Assignment:** Fresher Full Stack Developer (MERN) Task — AI-Powered Job Management System with Filters & Job Detail Page

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [AI Integration](#ai-integration)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Assumptions](#assumptions)

---

## ✨ Features

### Job Seeker (Find Jobs)
- Browse paginated job listings (10 jobs per page)
- Filter by title, company name, job category, location type, skills (any-match), and experience range
- All filters combinable simultaneously
- Filters preserved in URL query parameters
- Click any job card to view full job details
- AI-generated job summary on the detail page

### Employer (Post a Job)
- Create a job posting through a structured form
- Rich HTML editor for job description
- Conditional location fields (Country/State/City shown only for Hybrid or Work From Office)
- Multi-select for skills and education
- Experience range (min/max) with validation
- **"Improve with AI"** — submit a rough description and receive a polished, professional version
- Review AI-improved description before applying it
- Posted date auto-generated on the server

### AI Features
- AI description improvement via Groq (llama-3.3-70b-versatile)
- AI job summary generation on the detail page
- Both AI operations processed through a BullMQ queue backed by Redis
- AI API key never exposed to the browser

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| AI Provider | Groq API (llama-3.3-70b-versatile) |
| Queue | BullMQ |
| Queue Store | Redis (local) |
| HTML Editor | TipTap / React Quill |
| Validation | Zod (backend), React Hook Form (frontend) |
| Testing | Jest (backend unit tests) |

---

## 📁 Project Structure

```
job_management_system/
│
├── client/                        # Next.js frontend (App Router)
│   ├── app/
│   │   ├── page.tsx               # Landing page  /
│   │   ├── jobs/
│   │   │   ├── page.tsx           # Job listing   /jobs
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # Create job    /jobs/new
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Job detail    /jobs/:id
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── jobs/                  # JobCard, JobList, FilterPanel, Pagination
│   │   ├── forms/                 # JobForm, RichTextEditor, SkillsInput
│   │   ├── ai/                    # AIImprovePanel, AISummaryPanel
│   │   └── ui/                    # Button, Badge, Spinner, EmptyState, Toast
│   ├── lib/
│   │   └── api.ts                 # API client (fetch wrapper)
│   ├── .env.local
│   └── package.json
│
├── server/                        # Express.js backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── redis.js           # Redis connection
│   │   ├── models/
│   │   │   └── Job.js             # Mongoose Job schema
│   │   ├── routes/
│   │   │   ├── jobs.js
│   │   │   └── ai.js
│   │   ├── controllers/
│   │   │   ├── jobController.js
│   │   │   └── aiController.js
│   │   ├── services/
│   │   │   ├── jobService.js      # Filter query builder + CRUD
│   │   │   └── aiService.js       # Groq API calls + prompts
│   │   ├── queues/
│   │   │   ├── aiQueue.js         # BullMQ queue definition
│   │   │   └── aiWorker.js        # BullMQ worker
│   │   ├── middlewares/
│   │   │   ├── validate.js        # Zod validation middleware
│   │   │   ├── sanitize.js        # HTML sanitization
│   │   │   ├── rateLimiter.js     # express-rate-limit
│   │   │   └── errorHandler.js    # Global error handler
│   │   └── index.js               # App entry point
│   ├── .env
│   └── package.json
│
├── docs/
│   └── architecture.md
│
└── README.md
```

---

## ✅ Prerequisites

| Tool | Version | Check Command |
|---|---|---|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Redis | 7+ | `redis-cli ping` → `PONG` |
| Git | Any | `git --version` |

**Redis on macOS:**
```bash
brew install redis
brew services start redis
redis-cli ping   # should return PONG
```

---

## 🔐 Environment Variables

### `server/.env`

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/job_management?retryWrites=true&w=majority
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_URL=redis://localhost:6379
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### `client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` or `.env.local` to Git. Both are listed in `.gitignore`.
> ⚠️ Never prefix AI keys or database credentials with `NEXT_PUBLIC_`.

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/job_management_system.git
cd job_management_system
```

### 2. Start Redis

```bash
brew services start redis
redis-cli ping   # PONG
```

### 3. Install Root Dependencies

```bash
# From the project root — installs concurrently for running both servers together
npm install
```

### 4. Set Up Environment Variables

```bash
# Backend — copy the example and fill in your credentials
cp server/.env.example server/.env

# Frontend — copy the example (default value works for local dev)
cp client/.env.example client/.env.local
```

Edit `server/.env` with your actual **MongoDB URI** and **Groq API Key**.

### 5. Install Sub-project Dependencies

```bash
npm run install:all
```

Or manually:

```bash
cd server && npm install
cd ../client && npm install
```

### 6. Seed the Database (Optional)

```bash
npm run seed
```

### 7. Run Both Servers Together

```bash
# From the project root — starts backend (port 5000) and frontend (port 3000) concurrently
npm run dev
```

Or start them individually:

```bash
npm run dev:backend   # Express server on port 5000
npm run dev:frontend  # Next.js on port 3000
```

### 8. Verify

| Service | Check |
|---|---|
| Redis | `redis-cli ping` → `PONG` |
| Backend health | `GET http://localhost:5000/api/health` → `{ "status": "ok" }` |
| Frontend | `http://localhost:3000` loads landing page |

---

## 📡 API Reference

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | List jobs with filters and pagination |
| `POST` | `/api/jobs` | Create a new job |
| `GET` | `/api/jobs/:id` | Get job by ID |

#### `GET /api/jobs` Query Parameters

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `title` | string | Partial search on title |
| `companyName` | string | Partial search on company |
| `jobCategory` | string | Exact match |
| `locationType` | string | `WFH` / `Hybrid` / `WFO` |
| `skills` | string | Comma-separated, any-match |
| `experienceMin` | number | Min experience |
| `experienceMax` | number | Max experience |

**Success Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [],
    "pagination": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 }
  }
}
```

#### `POST /api/jobs` Request Body

```json
{
  "title": "Frontend Developer",
  "companyName": "TechCorp",
  "description": "<p>HTML from editor</p>",
  "locationType": "Hybrid",
  "country": "India",
  "state": "Karnataka",
  "city": "Bengaluru",
  "skills": ["React", "TypeScript"],
  "jobCategory": "Frontend",
  "education": ["Bachelor's"],
  "experienceMin": 1,
  "experienceMax": 3
}
```

### AI

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/improve` | Improve a job description |
| `POST` | `/api/ai/summary` | Generate a job summary |

#### `POST /api/ai/improve`

```json
// Request
{ "description": "We need react dev with node knowledge." }

// Response
{ "success": true, "data": { "improvedDescription": "We are seeking..." } }
```

#### `POST /api/ai/summary`

```json
// Request
{ "jobId": "674abc123def456gh789" }

// Response
{ "success": true, "data": { "summary": "TechCorp is seeking..." } }
```

### Error Format

```json
{ "success": false, "message": "Error description", "errors": {} }
```

---

## 🤖 AI Integration

**Provider:** Groq API — free tier, no credit card required.
**Model:** `llama-3.3-70b-versatile`
**Get a key:** [console.groq.com](https://console.groq.com)

### Flow

```
Client → POST /api/ai/improve
       → Express controller
       → BullMQ enqueues job → Redis stores it
       → Worker processes → calls Groq API
       → Result returned via waitUntilFinished()
       → Client shows preview → user approves or discards
```

### Security
- `GROQ_API_KEY` lives only in `server/.env`
- Never used in any file inside `/client`
- Never assigned to a `NEXT_PUBLIC_` variable

---

## 🧪 Running Tests

```bash
# Backend
cd server && npm test

# Frontend type check
cd client && npm run type-check

# Frontend lint
cd client && npm run lint

# Production build check
cd client && npm run build
```

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd client && npx vercel --prod
```
Add env var in Vercel dashboard: `NEXT_PUBLIC_API_URL=<your-render-url>`

### Backend → Render
- Root directory: `server`
- Build: `npm install`
- Start: `node src/index.js`
- Add all `server/.env` variables in Render dashboard

---

## 📝 Assumptions

1. **BullMQ is mandatory** — listed under Required Technologies; all AI calls go through the queue.
2. **Groq is the AI provider** — free tier, no card needed, ultra-fast inference.
3. **No authentication** — the assignment does not require login/registration. Public endpoints are protected by rate limiting and validation only.
4. **AI preview requires approval** — the improved description is never applied silently. Users must click "Apply".
5. **AI summary is on-demand** — not persisted in the database.
6. **Skills are free-text tags** — no predefined list enforced.
7. **Job categories are predefined** — Frontend, Backend, Full Stack, Design, DevOps, Data Science, Mobile, QA, Product, Other.
8. **Redis runs locally** — `redis://localhost:6379` for development. Replace with Redis Cloud URL for production.
9. **HTML is sanitized** — using `sanitize-html` on the server before storage and before rendering on the client.
10. **Posted date is server-generated** — never trusted from the client request body.
