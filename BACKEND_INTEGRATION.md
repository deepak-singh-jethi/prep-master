# Backend Integration Guide — PrepMaster v7.0.0

> **For contributors who want to connect PrepMaster to a backend without breaking its local-first philosophy**

This document is intentionally detailed. PrepMaster is not a typical CRUD web app — it is **offline-first, optimistic, and browser-owned by design**. Any backend contribution must respect that.

If you want to add sync, accounts, analytics, or cloud features, **read this fully before writing code**.

---

## 1. Core philosophy (non-negotiable)

PrepMaster follows a **Local-First Architecture**.

This means:

* The browser is the **primary source of truth**
* The app must work **fully offline**
* The backend is an **optional sync layer**, not a dependency
* UI/UX must not degrade if the backend is slow or unavailable

> ❗ If your backend design requires the UI to wait for the server — it is the wrong design for this project.

---

## 2. Current frontend reality (important context)

Before adding any backend, understand what already exists.

### Frontend characteristics

* Single-file SPA (`index.html`)
* Vanilla JavaScript (ES6 modules)
* No framework, no bundler
* Uses `localStorage` directly via `js/storage.js`
* Optimistic UI everywhere

### Existing storage keys

* `prepMasterData_v3` → main app data (schema 3.2)
* `prepMasterTimer` → active timer persistence

### Key files for backend contributors

```
js/storage.js   // persistence + validation (MOST IMPORTANT)
js/system.js    // orchestration
js/tasks.js     // domain logic
js/timer.js     // session tracking
```

> Backend logic must **never** be scattered across UI files.

---

## 3. Golden rules for backend contributors

### Do

* ✅ Treat `localStorage` as the authoritative store
* ✅ Sync **after** local writes succeed
* ✅ Design APIs to accept **client-generated IDs**
* ✅ Make every write idempotent
* ✅ Expect retries, duplicates, and out-of-order events

### Do NOT

* ❌ Block UI on API calls
* ❌ Require login to use the app
* ❌ Force schema changes without migration
* ❌ Replace localStorage with server responses blindly
* ❌ Introduce frameworks or build steps

---

## 4. Recommended integration architecture

```
UI Actions
   ↓
system.js
   ↓
storage.js  (local write)
   ↓
sync.js     (async, best-effort)
   ↓
Backend API
```

### Why this works

* UI stays fast and predictable
* Offline works automatically
* Backend failures are non-fatal
* Sync logic is isolated and removable

---

## 5. Suggested new file: `js/sync.js`

Backend contributors **must not** modify core logic directly. Instead, add a new module.

### Responsibilities of `sync.js`

* Observe local mutations (create/update/delete)
* Queue outbound changes
* Batch requests
* Retry with backoff
* Resolve conflicts safely

### Example (conceptual)

```js
export function enqueueSync(event) {
  // event = { type, payload, clientTimestamp }
}

export async function flushQueue() {
  // send batched events when online
}
```

---

## 6. Data ownership & conflict strategy

### Ownership rules

* Client generates IDs (UUID)
* Client timestamps are authoritative for ordering
* Server stores client metadata verbatim

### Conflict resolution (recommended)

* **Last-write-wins** based on client timestamp
* Server may reject writes only if malformed
* Never silently overwrite newer client data

> If conflict resolution becomes complex, surface it as a UI dialog — do not auto-destroy data.

---

## 7. Backend API design guidelines

### General

* JSON only
* camelCase keys
* ISO8601 UTC timestamps
* Versioned (`/api/v1`)

### Authentication (optional, future)

Auth must be **optional** and additive.

```http
POST /auth/login
POST /auth/refresh
```

If auth is unavailable, sync should silently noop.

---

## 8. Canonical data contracts

### Subject

```json
{
  "id": "string",
  "name": "string",
  "order": 1
}
```

### Task

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

### Study Session

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

### Analytics Event

```json
{
  "id": "uuid",
  "type": "TASK_CREATED | TIMER_STARTED | SESSION_COMPLETED",
  "payload": {},
  "createdAt": "ISO8601"
}
```

---

## 9. Minimal endpoint surface (v1)

Backend contributors should start with the smallest useful set.

```
GET    /api/v1/subjects
GET    /api/v1/tasks
POST   /api/v1/tasks
PATCH  /api/v1/tasks/:id
POST   /api/v1/sessions
POST   /api/v1/events/batch
```

All endpoints must:

* Accept duplicate requests safely
* Ignore unknown fields (forward compatibility)
* Return the canonical stored object

---

## 10. Offline & retry behavior

### Expected client behavior

* Sync only when `navigator.onLine === true`
* Retry with exponential backoff
* Persist sync queue in memory or localStorage

### Expected server behavior

* Accept late writes
* Accept out-of-order events
* Never assume real-time delivery

---

## 11. Migration & versioning

### Frontend schema

* Current schema: `3.2`
* Stored inside local payload

### Backend expectation

* Accept older schema versions
* Allow partial payloads
* Never hard-fail due to version mismatch

---

## 12. What a GOOD backend contribution looks like

* Adds `sync.js`
* Touches `storage.js` minimally (hooks only)
* Adds no new UI dependencies
* Works fully offline
* Is removable without breaking the app

## What a BAD backend contribution looks like

* Rewrites task logic to wait for API
* Requires login to open the app
* Breaks JSON import/export
* Introduces framework or build step

---

## 13. Contribution checklist (backend PRs)

* [ ] Read README.md fully
* [ ] Read this document fully
* [ ] No UI blocking on network calls
* [ ] No breaking schema changes
* [ ] Sync is optional & best-effort
* [ ] Clear documentation added

---

## 14. Final note to contributors

PrepMaster is intentionally **small, inspectable, and boring** — that is its strength.

If your backend idea makes the app:

* slower,
* online-dependent,
* harder to understand,
* or harder to self-host,

then it probably does not belong here.

Design for **resilience first, scale second**.

---

**This file exists to protect the product philosophy while still welcoming contributors.**

If you want help designing a backend that *fits* PrepMaster, open an issue with a proposal before coding.
