# 📚 PrepMaster (v6.0.1)

**The Ultimate Local-First Study Planner for Competitive Exams.**

![Version](https://img.shields.io/badge/version-6.0.1-blue)
![Tech](https://img.shields.io/badge/built%20with-Vanilla%20JS%20%2B%20Tailwind-teal)
![License](https://img.shields.io/badge/license-MIT-green)

PrepMaster is a lightweight, single-file Single Page Application (SPA) designed to help students manage syllabus coverage, track study hours, and analyze performance for competitive exams (like UPSC, SSC, JEE, etc.). 

It operates entirely in the browser using `localStorage`, meaning **no internet connection, backend, or login is required.**

## ✨ Key Features

### 🗓️ Planning & Organization
- **Dashboard:** At-a-glance view of "Today's Focus," backlog items, and daily progress bars.
- **Sprint Calendar:** Visual calendar with heat-map style indicators for study density, mock tests, and revision days.
- **Curriculum Manager:** specialized subject and topic management. organize your syllabus hierarchically (Subject -> Topics).
- **Backlog Bucket:** Automatically catches missed tasks from previous days so nothing slips through the cracks.

### ⏱️ Execution & Focus
- **Global Timer:** Persistent timer bar that tracks study sessions in real-time.
- **Zen Mode:** A distraction-free, full-screen overlay with a massive timer and control buttons to help you enter a flow state.
- **Focus Scoring:** Rate your focus level (1-5) after every session to track quality, not just quantity.

### 📊 Analytics & Insights
- **Performance Metrics:** Track total study hours, average focus quality, and completion rates.
- **Subject Distribution:** Visual bar charts showing time allocation across different subjects.
- **Drill-Down Analysis:** Click into any subject to see topic-wise statistics (Time spent, session count, last studied date).
- **Smart Insights:** Automated detection of "Power Subjects" (high focus/time) and "Weak Areas" (low focus/completion).
- **Review System:** Built-in Spaced Repetition logic (Again/Hard/Good/Easy) to schedule smart reviews.

### 🛡️ Data & Customization
- **Local-First:** All data is stored securely in your browser's `localStorage`.
- **Import/Export:** distinct JSON export feature for backups and data portability.
- **Dark Mode:** Fully responsive UI with a built-in light/dark theme toggle.
- **Glassmorphism UI:** Modern, aesthetic interface using Tailwind CSS.

---

## 🚀 Getting Started

Since PrepMaster is a **zero-dependency** single file application, installation is instant.

### Installation
1. Download the `index.html` file from this repository.
2. Open the file in any modern web browser (Chrome, Edge, Firefox, Safari).
3. Start planning!

### Usage Guide

1. **Create Subjects:** Go to the **Subjects** tab and add your core subjects (e.g., History, Polity, Physics).
2. **Add Topics:** Click on a subject to add specific chapters or topics.
3. **Plan Your Day:** Go to the **Dashboard**, click "New Task," and select a subject/topic. Set a duration.
4. **Start Studying:** Click the "Play" button on a task to start the timer.
5. **Zen Mode:** For deep work, click the bottom timer bar to enter full-screen Zen Mode.
6. **Log & Review:** When finished, stop the timer. Log your **Actual Time** and **Focus Score**.

---

## 🛠️ Tech Stack

PrepMaster is built with simplicity and longevity in mind. It uses no build tools, no npm, and no frameworks.

* **Core:** HTML5, Vanilla JavaScript (ES6+)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)
* **Icons:** [FontAwesome](https://fontawesome.com/) (via CDN)
* **Fonts:** Inter & JetBrains Mono (via Google Fonts)
* **Storage:** Browser LocalStorage API
* **Architecture:** Monolithic SPA (Single `index.html` file)

---

## 💾 Data Management

**Where is my data?**
Your data lives in your browser cache. If you clear your browser history/cache, you might lose your data.

**How to backup?**
1. Click the **Settings** (⚙️) icon in the top right.
2. Click **Export Now**.
3. Save the `.json` file to a safe location (Google Drive, Cloud, etc.).
4. To restore, use the **Import File** button in the settings menu.

> **Note:** The app includes an automatic "Safety Backup" feature that attempts to save a snapshot before you import new data.

---

## 🤝 Contributing

Contributions are welcome! Since this is a single-file project, please ensure:

1.  **Tailwind Classes:** Use standard Tailwind utility classes.
2.  **No External Scripts:** Do not add local JS files; keep logic embedded in the `<script>` tag at the bottom of `index.html`.
3.  **responsive:** Ensure UI changes work on mobile (`md:` and `lg:` breakpoints).

**To modify the code:**
1.  Fork the repo.
2.  Edit `index.html`.
3.  Submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Made for students, by students.*
