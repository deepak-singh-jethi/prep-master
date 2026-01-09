# PrepMaster (v6.0.1)

**The Ultimate Local‑First Study Planner for Competitive Exams**

| Version | Tech           | License       |
| ------- | -------------- | ------------- |
| v6.0.1  | Vanilla JS SPA | MIT (assumed) |

PrepMaster is a **lightweight, single‑file Single Page Application (SPA)** designed to help students manage syllabus coverage, track study hours, and analyze performance for competitive exams such as **UPSC, SSC, JEE, NEET**, and similar exams.

It operates **entirely in the browser** using `localStorage`, which means:

* ❌ No backend
* ❌ No internet connection required
* ❌ No login / authentication
* ✅ Fully offline
* ✅ User owns their data

---

## 1. What this project is (clear & honest)

Prep‑Master is a **"dumb" frontend application** designed to simulate a study / task / focus workflow. It is intentionally backend‑less and framework‑less:

* No React / Vue / Angular
* No bundler (Vite, Webpack, etc.)
* No server
* No API calls yet

Everything is driven by:

* Static `index.html`
* Plain JavaScript files
* Browser storage (localStorage)

This makes it ideal as a **UI + logic prototype** that will later be connected to a real backend.

---

## 2. High‑level architecture

```
Browser
 ├── index.html        (single entry point)
 ├── js/app.js         (bootstraps the app)
 ├── js/system.js      (global state & orchestration)
 ├── js/storage.js     (localStorage abstraction)
 ├── js/tasks.js       (task / study logic)
 ├── js/subjects.js    (subjects & categorization)
 ├── js/timer.js       (focus / session timer)
 ├── js/dialogs.js     (modals & UI dialogs)
 ├── js/analytics.js   (local analytics tracking)
 └── js/utils.js       (shared helper utilities)
```

There is **one HTML file** and multiple JS modules loaded via `<script>` tags.

---

## ✨ Key Features

### 🗓️ Planning & Organization

* **Dashboard**: At‑a‑glance view of *Today's Focus*, backlog items, and daily progress bars.
* **Sprint Calendar**: Visual calendar with heat‑map style indicators for study density, mock tests, and revision days.
* **Curriculum Manager**: Specialized subject and topic management. Organize your syllabus hierarchically (**Subject → Topics**).
* **Backlog Bucket**: Automatically catches missed tasks from previous days so nothing slips through the cracks.

### ⏱️ Execution & Focus

* **Global Timer**: Persistent timer bar that tracks study sessions in real‑time.
* **Zen Mode**: Distraction‑free, full‑screen overlay with a massive timer and controls to help you enter a flow state.
* **Focus Scoring**: Rate your focus level (1‑5) after every session to track *quality*, not just quantity.

### 📊 Analytics & Insights

* **Performance Metrics**: Track total study hours, average focus quality, and completion rates.
* **Subject Distribution**: Visual bar charts showing time allocation across different subjects.
* **Drill‑Down Analysis**: Click any subject to see topic‑wise stats (time spent, session count, last studied date).
* **Smart Insights**: Automated detection of **Power Subjects** (high focus/time) and **Weak Areas** (low focus/completion).
* **Review System**: Built‑in spaced repetition logic (*Again / Hard / Good / Easy*) for smart reviews.

### 🛡️ Data & Customization

* **Local‑First**: All data is stored securely in the browser using `localStorage`.
* **Import / Export**: JSON export & import for backups and portability.
* **Dark Mode**: Fully responsive UI with light / dark theme toggle.
* **Glassmorphism UI**: Modern aesthetic interface built using Tailwind CSS.

---

## 🚀 Getting Started

PrepMaster is a **zero‑dependency, single‑file application** — installation is instant.

### Installation

1. Download `index.html` from this repository.
2. Open the file in any modern browser (Chrome, Edge, Firefox, Safari).
3. Start planning.

### Usage Guide

1. **Create Subjects**: Go to the *Subjects* tab and add core subjects (History, Polity, Physics, etc.).
2. **Add Topics**: Click a subject to add chapters or topics.
3. **Plan Your Day**: From the Dashboard, click **New Task**, choose subject/topic, and set duration.
4. **Start Studying**: Click the ▶ Play button to start the timer.
5. **Zen Mode**: Click the bottom timer bar for full‑screen focus mode.
6. **Log & Review**: Stop the timer, log actual time and focus score.

---

## 🛠️ Tech Stack

PrepMaster is built with **simplicity and longevity** in mind — no build tools, no npm, no frameworks.

* **Core**: HTML5, Vanilla JavaScript (ES6+)
* **Styling**: Tailwind CSS (via CDN)
* **Icons**: FontAwesome (via CDN)
* **Fonts**: Inter & JetBrains Mono (Google Fonts)
* **Storage**: Browser LocalStorage API
* **Architecture**: Monolithic SPA (single `index.html`)

---

## 3. Folder & file breakdown (based on actual code)

### `/index.html`

**Role:**

* The single entry point of the application
* Defines the DOM structure
* Loads all JavaScript files

**Important notes:**

* There is no routing; screen changes are DOM‑driven
* IDs and class names in HTML are tightly coupled with JS logic
* Any backend‑driven data later must map cleanly into existing DOM containers

---

### `/js/app.js`

**Purpose:** Application bootstrap

**Responsibilities:**

* Initializes the app on page load
* Connects system modules together
* Triggers initial render

**Backend note:**

* This is the ideal place to initialize:

  * API client
  * Auth state
  * Environment config

---

### `/js/system.js`

**Purpose:** Global application controller

**Responsibilities:**

* Maintains global app state
* Coordinates between tasks, timer, storage, and UI
* Acts as the closest thing to a "state manager"

**Backend note:**

* This file should later:

  * Store the authenticated user
  * Sync local state with server state
  * Handle app‑wide error states

---

### `/js/storage.js`

**Purpose:** Local persistence layer

**Responsibilities:**

* Wrapper over `localStorage`
* Save / load tasks, sessions, progress
* Prevent direct `localStorage` access elsewhere

**Backend note (VERY IMPORTANT):**

* This file will become the **bridge layer**:

  * Local → Remote sync
  * Offline‑first strategy
* DO NOT let other files talk directly to backend APIs

---

### `/js/tasks.js`

**Purpose:** Core study / task logic

**Responsibilities:**

* Create, update, delete tasks
* Track task status
* Link tasks to subjects

**Backend note:**

* Each task here maps 1:1 to a future backend entity
* Keep task IDs stable and backend‑friendly

---

### `/js/subjects.js`

**Purpose:** Subject & category management

**Responsibilities:**

* Define subject list
* Map tasks to subjects
* Drive subject‑based filtering and UI grouping

**Backend note:**

* Subjects should be backend‑controlled eventually
* IDs must be stable (no array index‑based logic)

---

### `/js/timer.js`

**Purpose:** Focus / session timer

**Responsibilities:**

* Start, pause, reset timers
* Track elapsed time
* Trigger session completion events

**Backend note:**

* Timer results should later be sent as session logs
* Backend must accept partial sessions and crashes

---

### `/js/dialogs.js`

**Purpose:** UI dialogs & modals

**Responsibilities:**

* Open / close dialogs
* Confirm destructive actions
* Display errors and information

**UX note:**

* This is where backend validation errors should surface cleanly

---

### `/js/analytics.js`

**Purpose:** Local analytics tracking

**Responsibilities:**

* Track user actions
* Store events locally
* Log usage metrics

**Backend note:**

* Should later batch & send events to backend
* Must never block UI interactions

---

### `/js/utils.js`

**Purpose:** Shared helpers

**Responsibilities:**

* Formatting
* ID generation
* Date/time helpers

**Backend note:**

* Avoid logic duplication with backend
* Treat utils as presentation helpers only

---

## 4. Current data model (inferred from code)

### Task (current)

```js
{
  id: string,
  title: string,
  subject: string,
  completed: boolean,
  createdAt: number
}
```

### Session / Timer

```js
{
  taskId: string,
  startTime: number,
  endTime: number,
  duration: number
}
```

---

## 5. Product & UX assumptions baked into code

* Single user per browser
* No authentication
* No multi‑device sync
* Optimistic UI everywhere
* Local state is source of truth

Backend integration **must respect these assumptions initially** to avoid breaking UX.

---

## 6. How backend integration should be done (important)

### Golden rules

* ❌ Do NOT replace localStorage directly
* ✅ Wrap backend calls inside `storage.js`
* ✅ Keep UI logic untouched as much as possible

### Suggested flow

```
UI → system.js → storage.js → API → backend
```

---

## 7. Backend developer checklist (schema & API – CAREFUL)

### General rules

* Use **stable string IDs** (UUID preferred)
* Return **camelCase JSON**
* Never block UI on analytics calls
* Support offline reconciliation

---

### Core entities

#### User

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "createdAt": "ISO8601"
}
```

---

#### Subject

```json
{
  "id": "string",
  "name": "string",
  "order": 1
}
```

---

#### Task

```json
{
  "id": "uuid",
  "title": "string",
  "subjectId": "string",
  "completed": false,
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

---

#### Study Session

```json
{
  "id": "uuid",
  "taskId": "uuid",
  "startTime": "ISO8601",
  "endTime": "ISO8601",
  "durationSeconds": 1500
}
```

---

#### Analytics Event

```json
{
  "id": "uuid",
  "type": "TASK_CREATED | TIMER_STARTED | SESSION_COMPLETED",
  "payload": {},
  "createdAt": "ISO8601"
}
```

---

## 8. Required API endpoints (minimum)

### Auth (future‑proof, optional initially)

* `POST /auth/login`
* `POST /auth/logout`

---

### Core data sync

* `GET /subjects`
* `GET /tasks`
* `POST /tasks`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`

---

### Sessions

* `POST /sessions`
* `GET /sessions?taskId=`

---

### Analytics

* `POST /events/batch`

---

## 9. Backend DO‑NOT‑BREAK checklist

* [ ] Do NOT require frontend to change DOM structure
* [ ] Do NOT change task shape without versioning
* [ ] Do NOT return snake_case
* [ ] Do NOT enforce auth on day one
* [ ] Do NOT block writes due to analytics failure

---

## 10. Final note (important)

This project is **frontend‑logic heavy and backend‑agnostic by design**.

A good backend will:

* Treat frontend as the UX authority
* Adapt to existing task/session logic
* Gradually replace localStorage with sync, not disruption

---

**This README is now aligned with the real codebase.**
