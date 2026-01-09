# PrepMaster — v7.0.0

> **The Ultimate Local-First Study Planner for Competitive Exams**

[![Version](https://img.shields.io/badge/version-7.0.0-blue)](#)
[![Architecture](https://img.shields.io/badge/architecture-local--first-success)](#)
[![Tech](https://img.shields.io/badge/tech-vanilla%20js%20spa-informational)](#)

---

PrepMaster is a **local-first, single-file Single Page Application (SPA)** built to help serious aspirants plan, execute, and analyze their preparation for competitive exams such as **UPSC, SSC, JEE, NEET**, and similar exams.

It is intentionally designed to be:

* 📴 **Fully offline**
* 🔐 **Private by default** (no login, no server)
* ⚡ **Instant to start** (open → use)
* 🧠 **Focused on execution quality, not vanity metrics**

Everything runs **entirely in the browser** using `localStorage`.

---

## ✨ What’s new in v7.0.0

v7 is a **stability + clarity release**. No philosophy change — just hardening what already works.

* Improved internal data consistency & schema validation
* Clear separation of concerns between UI, state, and persistence
* Safer localStorage handling with corruption fallback
* More predictable timer persistence across reloads
* README & documentation aligned with actual codebase

---

## 🚀 Quick start (zero installation)

PrepMaster is a **zero-dependency app**.

### Option A — Recommended (local server)

```bash
# Python 3
python3 -m http.server 8000
# or
npx http-server -c-1 .
```

Open: [http://localhost:8000](http://localhost:8000)

### Option B — Direct open

You *can* open `index.html` directly, but some browsers handle ES modules better when served.

---

## 🧭 How to use (actual user flow)

1. **Create Subjects** → add your core subjects (History, Polity, Physics, etc.)
2. **Add Topics** → break subjects into manageable chapters
3. **Plan Tasks** → assign a topic + duration for the day
4. **Start Studying** → ▶ start the timer
5. **Zen Mode** → click the bottom timer bar for full-screen focus
6. **Log Quality** → stop the timer, log actual time + focus score (1–5)
7. **Review & Improve** → use analytics, backlog, and smart reviews

---

## 🗓️ Planning & Organization

* **Dashboard**: Today’s focus, backlog, and daily progress at a glance
* **Sprint Calendar**: Heat-map style calendar showing study density & patterns
* **Curriculum Manager**: Hierarchical syllabus structure (**Subject → Topics**)
* **Backlog Bucket**: Missed tasks are automatically carried forward

---

## ⏱️ Execution & Focus

* **Global Timer**: Persistent study timer (survives reloads)
* **Zen Mode**: Distraction-free full-screen study mode
* **Focus Scoring**: Rate each session (1–5) to track *quality*, not just hours

---

## 📊 Analytics & Insights

* Total study hours & session counts
* Average focus quality
* Subject-wise time distribution (visual)
* Topic-level drill-down (time, sessions, last studied)
* Smart flags for **Power Subjects** and **Weak Areas**
* Lightweight spaced-review logic (Again / Hard / Good / Easy)

---

## 🛡️ Data, Privacy & Ownership

* **Local-first by design** — data never leaves your device
* Stored in browser `localStorage`
* **Import / Export JSON** for backups & portability
* Safe-guarded against corrupted saves (automatic backup key)

---

## 🛠️ Tech stack (intentionally boring)

PrepMaster avoids frameworks and build tools on purpose.

* **Core**: HTML5 + Vanilla JavaScript (ES6 modules)
* **Styling**: Tailwind CSS (CDN)
* **Icons**: FontAwesome (CDN)
* **Fonts**: Inter & JetBrains Mono
* **Storage**: Browser LocalStorage API
* **Architecture**: Monolithic SPA (`index.html` + `js/` modules)

---

## 🗂️ Project structure (real codebase)

```
index.html                 # Single entry point (UI + Tailwind config)
js/
 ├─ app.js                 # App bootstrap
 ├─ system.js              # Global orchestration & UI coordination
 ├─ storage.js             # LocalStorage abstraction + validation
 ├─ tasks.js               # Task & review logic
 ├─ subjects.js            # Subject / topic management
 ├─ timer.js               # Persistent timer engine
 ├─ dialogs.js             # Modal & confirmation system
 └─ utils.js               # Shared helpers (IDs, dates, formatting)
```

---

## 💾 Local data model (v7)

**Storage key**: `prepMasterData_v3`

```json
{
  "schema": 3.2,
  "subjects": [],
  "tasks": [],
  "targetDate": "YYYY-MM-DD",
  "lastBackup": "ISO8601"
}
```

**Task (conceptual)**

```json
{
  "id": "uuid",
  "title": "string",
  "subject": "subjectId",
  "duration": 45,
  "actualTime": 30,
  "completed": false,
  "createdAt": "ISO8601"
}
```

Active timer state is stored separately under `prepMasterTimer`.

---

## 🔮 Backend-ready (without breaking local-first)

PrepMaster **does not require a backend**, but it is designed so one can be added later *without rewriting the UI*.

### Integration rules (non-negotiable)

* UI remains optimistic and offline-capable
* Backend sync must be optional
* LocalStorage remains the source of truth initially
* Server adapts to existing data shape (not the other way around)

---

## 📡 Backend developer checklist (v7 contract)

### General

* Use **camelCase JSON**
* Use stable UUIDs
* Accept idempotent writes
* Never block UI on analytics

### Core entities

**Subject**

```json
{ "id": "string", "name": "string", "order": 1 }
```

**Task**

```json
{
  "id": "uuid",
  "title": "string",
  "subjectId": "string",
  "duration": 45,
  "actualTime": 30,
  "completed": false,
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

**Study Session**

```json
{
  "id": "uuid",
  "taskId": "uuid",
  "startTime": "ISO8601",
  "endTime": "ISO8601",
  "durationSeconds": 1500,
  "focusScore": 4
}
```

### Minimal endpoints (future)

* `GET /api/v1/subjects`
* `GET /api/v1/tasks`
* `POST /api/v1/tasks`
* `PATCH /api/v1/tasks/:id`
* `POST /api/v1/sessions`
* `POST /api/v1/events/batch`

---

## 🧪 Testing (manual but effective)

* Create subject → topic → task
* Start timer → reload page → verify persistence
* Stop timer → log focus → check analytics
* Export JSON → clear storage → import JSON

---

## 📌 Philosophy (why this exists)

PrepMaster is built on one belief:

> *Consistency beats intensity — but only if you measure quality.*

This app is meant to stay out of your way, work offline, respect your data, and help you execute every single day.

---

## 📄 License

MIT (recommended). Add a `LICENSE` file if distributing publicly.

---

**PrepMaster v7.0.0** — stable, local-first, distraction-free.
