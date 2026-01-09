# PrepMaster — v6.0.1

> **The Ultimate Local‑First Study Planner for Competitive Exams**

[![PrepMaster v6.0.1](https://img.shields.io/badge/version-6.0.1-blue?logo=github)](https://github.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](#license)

---

A compact, single‑file **vanilla JavaScript SPA** that runs entirely in your browser (`localStorage`‑backed). No build step, no backend required — designed to be *fast*, *offline*, and *easy to inspect*.

This README was written after a full review of the repository so the text below is aligned with the exact code shipped in the `index.html` and `js/` modules.

---

## Quick links

* Live file: `index.html` (single entry point)
* Important JS modules: `js/app.js`, `js/system.js`, `js/storage.js`, `js/tasks.js`, `js/timer.js`
* Local storage key: `prepMasterData_v3`
* Storage schema: `3.2`
* Timer persist key: `prepMasterTimer`

---

## Table of contents

1. What this is (short)
2. Quick start — run it like a human
3. What I found (code inspection highlights)
4. Feature map (user focused)
5. Project structure (developer view)
6. How data is stored & migration notes
7. Recommended next steps (prioritised)
8. Backend developer checklist & API schema (practical)
9. Contributing, testing, license

---

## 1) What this is (short)

PrepMaster is a local‑first, offline study planner focused on short study sessions, syllabus tracking, and simple analytics. It’s ideal as a prototype or lightweight tool for personal use.

Key philosophy: **the browser is the owner of the data** — this app keeps everything locally and avoids any server dependency.

---

## 2) Quick start — run it like a human

1. Download `index.html` from the repo.
2. Recommended: serve it with a simple static server (ES modules work most reliably this way):

```bash
# Python 3
python3 -m http.server 8000
# or Node (if you have npx)
npx http-server -c-1 .
```

3. Open [http://localhost:8000](http://localhost:8000) in your browser.
4. Start by creating a Subject → add Topics → Add Task → ▶ Play.

> Tip: The app *can* be opened directly via file:// in many browsers, but serving is more reliable across environments.

---

## 3) What I found (code inspection highlights — precise & useful)

I inspected the repository files in `index.html` and `js/*.js`. Here are the important, actionable details.

### Storage and schema

* The app saves its main payload under `localStorage` key: `prepMasterData_v3`.
* The saved JSON contains a `schema` field expected to be `3.2`.

Snippet from `js/storage.js`:

```js
const STORAGE_KEY = 'prepMasterData_v3';
// payload contains { schema: 3.2, tasks, subjects, targetDate, lastBackup }
```

If the `schema` mismatches, `validateData()` will report a version mismatch — the app will not silently accept older/newer schemas.

### Timer persistence

* Active timer state is persisted separately under `prepMasterTimer` so an active session survives a page reload.

### Module system

* The code uses **ES modules** (e.g., `import { ... } from './utils.js'`) and `type="module"` scripts. For reliable behavior, serve the app over HTTP rather than opening as raw file in all browsers.

### UI / Design tech

* Tailwind CSS loaded via CDN (no build step), FontAwesome icons, Google fonts.
* The UI uses glassmorphism and dark/light theme toggles embedded in `index.html`.

### Built‑in behaviors worth knowing

* The app automatically moves missed tasks into a “Backlog” bucket.
* Focus scoring & a small review UI exist (Again / Hard / Good / Easy) for each task — a simple SRS-like mechanism.
* The app includes small analytics stored locally (no network calls) and a batch export/import mechanism exists in the UI.

---

## 4) Feature map (user facing)

* Dashboard: Today’s focus, time left, quick stats.
* Sprint calendar with heatmap indicators.
* Subjects → Topics hierarchical curriculum manager.
* Create/Start tasks with duration, run a persistent timer.
* Zen Mode: full‑screen distraction‑free timer with scoring.
* Export / Import (JSON) for backups.
* Basic analytics: time per subject, sessions count, average focus.

---

## 5) Project structure (developer view)

```
index.html                # Single SPA file — markup, styles, tailwind config
js/
  ├─ app.js               # Bootstraps `window.app`, wires UI to modules
  ├─ system.js            # App-level utilities, backup checks, UI orchestration
  ├─ storage.js           # localStorage wrapper, save/load/validate
  ├─ tasks.js             # Task creation, card rendering, review buttons
  ├─ subjects.js          # Subject/topic CRUD and UI lists
  ├─ timer.js             # Timer state, elapsed calculation, persist/restore
  ├─ dialogs.js           # Small queuing modal system (alert/confirm/prompt)
  └─ utils.js             # generateUUID, formatDate and helpers
```

Notes:

* Files are small and readable — a good candidate for incremental refactor.
* All network‑related code is absent by design — any API integration should be introduced through `storage.js` or a new `sync.js` shim.

---

## 6) How data is stored & migration notes (important!)

### Primary storage format (current)

Main object stored at `prepMasterData_v3` looks like:

```json
{
  "schema": 3.2,
  "tasks": [ /* array of task objects */ ],
  "subjects": [ /* array of subjects */ ],
  "targetDate": "2026-02-01",
  "lastBackup": "2026-01-09T12:00:00.000Z"
}
```

**Task shape (inferred)**

```json
{
  "id": "uuid",
  "title": "string",
  "subject": "subjectId or name",
  "duration": 45,        // planned minutes
  "actualTime": 30,      // minutes logged
  "completed": false,
  "createdAt": "ISO8601"
}
```

### Corruption & backups

* If `loadFromStorage()` finds invalid JSON, it creates a backup key suffixed with `_corrupted` and returns `null` — so the original is preserved. Good safety practice.

### Migration guidance

If you want to introduce a backend or change schema:

1. Add a `migration` module that reads old schemas and maps to the new format.
2. Update `storage.js` to call migrations during `loadFromStorage()`.
3. Keep `schema` bumping and a `migrations/` folder with reversible steps.

---

## 7) Recommended next steps (prioritised)

**P0 — Safe, small changes (do first)**

* Implement an API shim inside `js/storage.js` (a `syncToServer()` function) that can be toggled on/off.
* Add a `migrations` function to handle schema changes without losing user data.
* Add a small test page or instructions for automatic backups (download JSON export).

**P1 — Backend readiness**

* Create a `sync.js` that batches analytics and session uploads (`/events/batch`).
* Add an optional local dev flag `USE_MOCK_API` to route requests to a mock server.

**P2 — Nice to have**

* Move CSS tokens out to a `styles/` file and keep `index.html` minimal.
* Add E2E smoke test (open page → create subject → add task → start timer).

---

## 8) Backend developer checklist & API schema (practical)

This app is local‑first — **server integration must not break the offline UX**. Introduce server sync as an opt‑in, eventually replace local writes by syncing and reconciling, not by forcing clients to change shape.

### Minimal API surface (recommended)

All responses use **camelCase** and timestamps in ISO8601 UTC.

#### Auth (optional for later)

`POST /auth/login` → `{ user, token }`
`POST /auth/refresh` → `{ token }`

#### Subjects

`GET /api/v1/subjects` → `{ data: [ { id, name, order } ] }`
`POST /api/v1/subjects` → create subject

#### Tasks

`GET /api/v1/tasks?since=...` → `{ data: [task] }`
`POST /api/v1/tasks` → `{ task }`
`PATCH /api/v1/tasks/:id` → `{ task }`
`DELETE /api/v1/tasks/:id`

**Task JSON (align with local data)**

```json
{
  "id": "uuid",
  "title": "string",
  "subjectId": "string",
  "duration": 45,
  "actualTime": 15,
  "completed": false,
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

#### Sessions / Timer

`POST /api/v1/sessions` — send completed session

```json
{ "taskId":"uuid","startTime":"ISO8601","endTime":"ISO8601","durationSeconds":1500 }
```

#### Analytics

`POST /api/v1/events/batch` — accepts an array of local events (non‑blocking)

**Important server rules**

* Do **not** force the client to change DOM or task shape: provide a compatibility layer.
* Accept upserts for tasks and return the authoritative resource.
* Support idempotent requests (client may retry). Use request IDs or allow posting client IDs.

---

## 9) Contributing, testing & license

* Small repo, single file architecture — keep changes minimal and document migrations in `README`.
* License: MIT recommended (please add `LICENSE` file).

### Test suggestions

* Manual smoke test: create subject → create task → start timer → stop → export JSON → import JSON.
* Add unit tests for `storage.js` migration logic.

---

## Final, human‑to‑human notes (why I’d use this app)

PrepMaster is delightful because it **keeps friction low** — open the file, start studying. The UX choices (Zen mode, focus scoring, heatmap calendar, backlog capture) are pragmatic and match what high performers use: tracking focused time and reflecting on quality rather than raw grind. It’s also a great seed project to evolve into a syncable product while preserving offline-first behavior.

If you want, I can now:

* Produce a **machine‑readable `docs/api_contract.md`** that exactly matches the local task shapes (ready for backend devs).
* Implement a **lightweight `sync.js` shim** inside the repo that demonstrates a no‑op server sync + safe retries.
* Create **exported markdown release notes** and a polished `LICENSE` file.

Which of these should I generate next? 👇

* [ ] API contract (docs/api_contract.md)
* [ ] `sync.js` shim + example server responses
* [ ] LICENSE (MIT)

---

*Prepared after a code review of the shipped repo. If you want this README written to a specific style (brand colors, more screenshots, or a shorter TL;DR), tell me and I’ll refine it.*
