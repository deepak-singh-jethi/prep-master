# PrepMaster (v5.4.2)

PrepMaster is a production-ready Single Page Application built for long-term exam preparation. It combines structured planning, time tracking, calendar scheduling, and spaced repetition into a single offline-first frontend.

This README is written as technical documentation. It is intended for engineers, especially backend developers, who want to integrate their own storage or APIs with this frontend while preserving all existing behavior.

---

## 1. What this application does

PrepMaster helps a user plan, execute, and revise their study in a controlled and measurable way. It is not just a task list. It enforces a workflow:

1. Plan study tasks by date and subject
2. Track real time spent using a persistent timer
3. Review completed topics using spaced repetition
4. Measure progress using derived analytics

All logic lives in the frontend. The backend, if added, is responsible only for persistence and synchronization.

---

## 2. Architectural overview

PrepMaster is a plain Single Page Application.

* Technology: HTML and vanilla JavaScript
* Styling: Tailwind via CDN
* Build step: none
* Frameworks: none

The application uses a single in-memory state object (`app.data`). All UI rendering is derived from this state. Persistence is handled explicitly through browser localStorage.

This design makes the app predictable, debuggable, and safe to integrate with any backend.

---

## 3. Core design rules

These rules are important for anyone integrating a backend.

* The frontend owns all business logic
* The backend must not recalculate revision schedules
* The backend must not mutate timer state
* All dates are stored as simple strings (YYYY-MM-DD)
* All IDs are stable and immutable

Violating these rules will cause subtle bugs.

---

## 4. Feature breakdown (in depth)

### 4.1 Task system

A task represents a single unit of planned study.

A task always has:

* A unique ID
* A subject and optional sub-topic
* A planned date (or backlog state)
* A planned duration

Additional properties are added as the task is worked on or reviewed.

Supported operations:

* Create a task
* Edit task metadata
* Start, pause, and stop a timer on the task
* Mark task as partially complete or done
* Delete task safely

Important behaviors:

* Deleting a task that has an active timer will first stop the timer
* Editing a task never changes its ID
* A task can exist without a date (backlog)

---

### 4.2 Subject system

Subjects define the syllabus structure.

A subject is not just a label. It is used to group tasks, analytics, and revision history.

Supported operations:

* Add a subject
* Rename a subject
* Delete a subject

Rules:

* Renaming a subject updates all tasks that reference it
* Deleting a subject deletes all associated tasks
* If any deleted task has an active timer, the timer is stopped first

This guarantees consistency and prevents crashes.

---

### 4.3 Timer system

The timer is implemented as a state machine.

It tracks real elapsed time spent on a task and survives page reloads and browser restarts.

Key properties:

* Only one timer can be active at a time
* Timer state is persisted separately from tasks
* Timer restoration validates task existence

Timer lifecycle:

1. Start timer on a task
2. Pause or resume as needed
3. Stop timer and record elapsed time

Internally, elapsed time is calculated using:

* `startTime`: when the timer last started
* `accumulated`: previously recorded elapsed time

Display guards prevent unrealistic values, but stored data is never altered.

---

### 4.4 Calendar planning

The calendar is the primary planning interface.

Features:

* Month navigation
* Day selection
* Viewing and managing tasks for a specific date

Dates are stored as plain strings in YYYY-MM-DD format. This avoids timezone bugs and makes backend integration simpler.

---

### 4.5 Smart Revision (spaced repetition)

PrepMaster includes an overdue-based spaced repetition system.

How it works:

* When a task is completed, future review dates are calculated
* Review tasks are generated dynamically
* Missing a review day does not discard the review

A review is due if:

nextReviewDate is less than or equal to the selected date

Review tasks:

* Are stored as normal tasks
* Are marked with `isRevision: true`
* Reference the original task using `reviewOf`

This allows revision tasks to be tracked, timed, and analyzed like any other task.

---

### 4.6 Adaptive recall

When completing a revision task, the user selects how well they remembered the topic.

Recall options:

* Again
* Hard
* Good
* Easy

Each option maps to a fixed next-review interval. The mapping is deterministic and must not be changed by the backend.

The recall result updates:

* Next review date
* Review stage
* Last reviewed timestamp

---

### 4.7 Analytics

Analytics are derived from existing task data.

They are computed on demand and never stored separately.

Examples include:

* Total study time
* Completion percentage
* Subject-wise time distribution

Because analytics are derived, backend systems may recompute them if needed.

---

### 4.8 Backup and restore

The application supports JSON export and import.

Export:

* Exports the full application state
* Excludes active timer state

Import:

* Validates schema
* Confirms overwrite
* Rejects incompatible data

If stored data becomes corrupted, the app preserves a backup copy before resetting to a safe default state.

---

## 5. Data schema (authoritative)

This section defines the exact data contract used by the frontend.

### 5.1 Root state object

Stored under the key `prepMasterData_v3`.

{
"schema": 3.2,
"tasks": ["Task"],
"subjects": ["Subject"],
"targetDate": "YYYY-MM-DD",
"lastBackup": "ISO_TIMESTAMP"
}

The backend should store this object exactly or normalize it carefully.

---

### 5.2 Task object

{
"id": "string (uuid)",
"subject": "string",
"subSubject": "string",
"desc": "string",
"date": "YYYY-MM-DD | null",
"duration": "number (minutes)",
"actualTime": "number (minutes)",
"focusScore": "number (1-5)",
"status": "pending | partial | done | backlog",

"isRevision": "boolean",
"reviewOf": "task id | null",
"reviewStage": "number",
"nextReviewDate": "YYYY-MM-DD | null",
"lastReviewedAt": "YYYY-MM-DD | null",
"lastRecallQuality": "again | hard | good | easy"
}

Important notes:

* All task IDs are immutable
* `isRevision` distinguishes generated review tasks
* `reviewOf` links revisions to the original task
* `nextReviewDate` controls smart revision selection

---

### 5.3 Subject object

{
"id": "string (uuid)",
"name": "string",
"sub": ["string"]
}

Subjects are referenced by name in tasks. Renaming a subject updates all tasks.

---

### 5.4 Active timer object

Stored separately under `prepMasterTimer`.

{
"id": "task id",
"startTime": "number (epoch ms)",
"accumulated": "number (ms)"
}

Timer data is ephemeral and should not be treated as historical study data by a backend.

---

## 6. Backend integration strategies

Several integration approaches are possible.

1. Full-state synchronization

   * Store and restore the root state object

2. Normalized persistence

   * Store tasks and subjects in separate tables
   * Reconstruct the root object on load

3. Event-based persistence

   * Store task events
   * Replay events to rebuild state

Regardless of approach, the frontend must remain the authority for business logic.

---

## 7. Stability and guarantees

The application guarantees:

* No uncaught runtime crashes
* Defensive handling of corrupted storage
* Safe deletion of tasks and subjects
* Timer isolation and validation
* Full regression QA coverage

---

## 8. Versioning and release status

Version 5.4.2 is a production stability release. It has passed full end-to-end QA and is suitable for public use.

---

## 9. Final notes for backend engineers

This frontend is intentionally explicit and conservative. If you integrate a backend and respect the data contract defined above, you can safely extend the system without breaking existing users.
