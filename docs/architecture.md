# 🏗 System Architecture — AI-Powered Job Management System

## Overview

This document explains the architecture, design decisions, and technical trade-offs made in building the AI-Powered Job Management System.

---

## Architecture Style: Modular Monolith

The application uses a **Modular Monolith** architecture — a single deployable backend server with clearly separated internal modules (routes, controllers, services, models, queues, middlewares).

This was chosen over microservices because:
- The assignment scope does not justify distributed service coordination overhead.
- A single Express server is easier to deploy, debug, and review for a fresher-level submission.
- Internal module boundaries (services, queues, middlewares) still provide clean separation of concerns.

---

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  CLIENT (Next.js App Router)                 │
│                                                             │
│   /          → Landing Page                                 │
│   /jobs      → Job Listing + Filters + Pagination           │
│   /jobs/new  → Job Creation Form + AI Improve               │
│   /jobs/:id  → Job Detail + AI Summary                      │
│                                                             │
│   Fetches data from backend via HTTP REST API               │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST (JSON)
                        │ CORS: localhost:3000 only
┌───────────────────────▼─────────────────────────────────────┐
│                  SERVER (Express.js)                         │
│                                                             │
│  Middleware stack:                                          │
│   helmet → cors → json → rateLimiter → routes              │
│                                                             │
│  Routes:                                                    │
│   GET  /api/health                                          │
│   GET  /api/jobs          → jobController.listJobs          │
│   POST /api/jobs          → jobController.createJob         │
│   GET  /api/jobs/:id      → jobController.getJob            │
│   POST /api/ai/improve    → aiController.improveDesc        │
│   POST /api/ai/summary    → aiController.summarizeJob       │
│                                                             │
│  Global error handler middleware (last in chain)            │
└──────────┬─────────────────────────┬───────────────────────┘
           │                         │
┌──────────▼──────────┐   ┌──────────▼──────────────────────┐
│  MongoDB Atlas       │   │  Redis + BullMQ                  │
│                      │   │                                  │
│  Collection: jobs    │   │  Queue: "ai-processing"          │
│  Mongoose ODM        │   │  Worker: aiWorker.js             │
│  Text search on      │   │  Jobs: improve, summary          │
│  title + company     │   │  Retry: 3 attempts               │
└─────────────────────┘   └──────────────┬───────────────────┘
                                          │
                           ┌──────────────▼──────────────────┐
                           │  Groq API                        │
                           │  Model: llama-3.3-70b-versatile  │
                           │  Accessed server-side only       │
                           └─────────────────────────────────┘
```

---

## Layer-by-Layer Breakdown

### 1. Frontend — Next.js (App Router)

**Why Next.js?**
The assignment explicitly requires Next.js.

**Routing:**
| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Landing page with hero, latest jobs, how it works |
| `/jobs` | `app/jobs/page.tsx` | Filterable, paginated job listing |
| `/jobs/new` | `app/jobs/new/page.tsx` | Job creation form with AI improve |
| `/jobs/[id]` | `app/jobs/[id]/page.tsx` | Job detail with AI summary |

**State Management:**
No external state library (Redux, Zustand) is needed. React `useState` and `useEffect` are sufficient for this scope. Filter state is synced with URL search parameters using `useSearchParams` and `useRouter` to support page refresh and sharing.

**API Layer:**
A centralized `lib/api.ts` file wraps `fetch` calls to the backend. All components import from this module — no inline `fetch` calls scattered across components.

**Styling:**
Tailwind CSS with a consistent design token system:
- White / very light neutral backgrounds
- Charcoal primary text
- Muted gray secondary text
- Indigo accent color
- Consistent border radius and spacing scale

**HTML Rendering:**
Job descriptions are rendered using `dangerouslySetInnerHTML` only after being sanitized through the backend's `sanitize-html` middleware before storage. An additional client-side DOMPurify pass is applied before rendering.

---

### 2. Backend — Express.js

**Why Express over NestJS?**
Express is simpler and faster to structure for a fresher-level assignment. NestJS adds decorator overhead and boilerplate not required here. Express is chosen for clarity and speed of development.

**Module Structure:**

```
routes/       → Define URL + HTTP method → delegate to controller
controllers/  → Parse req/res, call service, return response
services/     → Business logic (filter builders, DB queries, AI calls)
models/       → Mongoose schemas and static methods
queues/       → BullMQ queue definition and worker
middlewares/  → Cross-cutting concerns (validation, sanitization, errors)
config/       → DB connection, Redis connection
```

**Middleware Chain:**
```
Request
  → helmet()           # Secure HTTP headers
  → cors()             # Allow only CLIENT_URL origin
  → express.json()     # Parse JSON body
  → rateLimiter()      # 100 req/15min per IP (configurable)
  → router             # Route-specific validation middleware
  → controller         # Handle business logic
  → errorHandler()     # Global catch-all for unhandled errors
```

**Error Handling:**
All controllers use `try/catch` and call `next(error)` on failure. The global `errorHandler` middleware formats every error response consistently:
```json
{ "success": false, "message": "...", "errors": {} }
```

**Input Validation:**
Zod schemas are defined for every POST endpoint. A `validate(schema)` middleware factory runs before each controller and returns a 400 with field-level errors if validation fails.

---

### 3. Database — MongoDB + Mongoose

**Why MongoDB?**
The assignment explicitly requires MongoDB.

**Job Schema:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | String | Yes | minLength: 2 |
| `companyName` | String | Yes | minLength: 2 |
| `description` | String | Yes | Stored as sanitized HTML |
| `locationType` | String | Yes | enum: WFH, Hybrid, WFO |
| `country` | String | Conditional | Required if locationType ≠ WFH |
| `state` | String | No | |
| `city` | String | Conditional | Required if locationType ≠ WFH |
| `skills` | [String] | No | Stored as array |
| `jobCategory` | String | No | |
| `education` | [String] | No | Array |
| `experienceMin` | Number | No | ≥ 0 |
| `experienceMax` | Number | No | ≥ experienceMin |
| `postedDate` | Date | Auto | Set server-side on creation |
| `createdAt` | Date | Auto | Mongoose timestamps |
| `updatedAt` | Date | Auto | Mongoose timestamps |

**Filter Query Builder:**

The `jobService.buildFilterQuery()` function dynamically constructs a MongoDB query object based on whichever filters are present in the request:

```javascript
// Simplified example
if (title) query.title = { $regex: title, $options: 'i' };
if (skills) query.skills = { $in: skills.split(',') };
if (experienceMin) query.experienceMax = { $gte: Number(experienceMin) };
if (experienceMax) query.experienceMin = { $lte: Number(experienceMax) };
```

**Pagination:**
```javascript
const skip = (page - 1) * limit;
const jobs = await Job.find(query).skip(skip).limit(limit).sort({ postedDate: -1 });
const total = await Job.countDocuments(query);
```

---

### 4. AI Integration — Groq + BullMQ

**Why Groq?**
- Free tier with no credit card required
- Fastest inference available (sub-second responses)
- Compatible with the OpenAI SDK client format
- Supports `llama-3.3-70b-versatile` — a high-quality open model

**Why BullMQ?**
BullMQ is listed under Required Technologies in the assignment. It provides:
- Reliable job processing with retries on failure
- Decoupling of the API request from the AI API call
- A foundation for true async processing if needed in future

**AI Processing Flow:**
```
POST /api/ai/improve
  → Validate input (description must be non-empty)
  → aiQueue.add('improve', { description })   // Enqueue
  → job.waitUntilFinished(queueEvents)        // Wait for result
  → Return { improvedDescription }
```

The worker (`aiWorker.js`) runs in the same process as the server (for simplicity) and handles:
- Calling the Groq API with the appropriate prompt
- Retrying up to 3 times on transient failures
- Throwing on permanent failures (so BullMQ marks the job as failed)

**Synchronous vs Asynchronous Decision:**
For the "Improve with AI" feature, the user is waiting on-screen for the result. True async (return a job ID, poll for result) adds frontend complexity without meaningful UX benefit at this scale. We use `waitUntilFinished()` to make the BullMQ processing synchronous from the HTTP request's perspective while still keeping the infrastructure in place for future true-async implementation.

**Security:**
- `GROQ_API_KEY` is stored only in `server/.env`
- Not imported in any file inside `/client`
- Not assigned to any `NEXT_PUBLIC_` environment variable
- Input to the AI prompt is validated and sanitized before being sent

---

### 5. BullMQ + Redis

**Queue:** `ai-processing`

**Job Types:**
| Job Name | Data | Worker Action |
|---|---|---|
| `improve` | `{ description }` | Calls Groq improve prompt |
| `summary` | `{ title, companyName, description, skills, jobCategory, experienceMin, experienceMax }` | Calls Groq summary prompt |

**Retry Policy:**
- 3 attempts per job
- Exponential backoff between retries
- Failed jobs logged and preserved in Redis (not auto-deleted)

**Redis:**
- Local: `redis://localhost:6379` (development)
- Production: Redis Cloud URL via `REDIS_URL` environment variable

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Architecture | Modular Monolith | Right-sized for assignment scope |
| Backend framework | Express.js | Simpler than NestJS for fresher level |
| AI provider | Groq | Free tier, no card, fastest inference |
| AI processing | BullMQ (sync wait) | Required technology; sync for UX simplicity |
| State management | React local state + URL params | No external library needed |
| Filter persistence | URL query params | Free page-refresh and share support |
| HTML storage | Sanitize before store | Prevent XSS at the source |
| Auth | None | Not specified in assignment |
| AI key security | Server-side `.env` only | Prevents browser exposure |

---

## Security Considerations

| Threat | Mitigation |
|---|---|
| AI key exposure | Stored in `server/.env` only; never in client code |
| XSS via HTML editor | `sanitize-html` on server before storage; DOMPurify on client before render |
| MongoDB injection | Mongoose escapes all query values |
| Input abuse | `express-rate-limit`: 100 requests per 15 minutes per IP |
| Malformed ObjectId | `mongoose.Types.ObjectId.isValid()` check before DB query |
| CORS | Configured to allow only `CLIENT_URL` origin |
| HTTP header attacks | `helmet` middleware sets secure defaults |

---

## Folder-by-Folder Responsibility Summary

| Folder | Responsibility | Changes when... |
|---|---|---|
| `server/src/config/` | DB and Redis connections | Credentials or providers change |
| `server/src/models/` | Data shape and DB validation | Job fields are added/removed |
| `server/src/routes/` | URL definitions | New endpoints are added |
| `server/src/controllers/` | HTTP request/response handling | Response format changes |
| `server/src/services/` | Business logic | Filter logic or AI prompts change |
| `server/src/queues/` | Background AI processing | Queue logic or retry policy changes |
| `server/src/middlewares/` | Validation, sanitization, errors | Input rules or error format changes |
| `client/app/` | Pages and routing | New pages or route changes |
| `client/components/` | Reusable UI | UI changes or new features |
| `client/lib/` | API client | Backend URL or API format changes |

---

## Scalability Notes

This is a fresher-level assignment. The architecture is intentionally simple. For a production system, the following would be considered:

- **Horizontal scaling:** The Express server is stateless (session not used) so it can run behind a load balancer.
- **Redis Cloud:** Replace local Redis with a managed Redis Cloud instance for persistence and reliability.
- **MongoDB Atlas indexing:** Add compound text index on `title` + `companyName` for faster search at scale.
- **True async AI:** Return a job ID from the enqueue step and poll `/api/ai/status/:jobId` for the result, enabling non-blocking AI calls.
- **Microservices:** Split the AI service into a separate process if AI load grows independently of job CRUD traffic.

These are not implemented because the assignment does not require them and adding unnecessary complexity would obscure the core functionality being evaluated.
