# 🔥 Habit Tracker

A simple, beginner-friendly habit tracking app built with **Angular**. Track daily habits, build streaks, and stay consistent — all data is saved locally in your browser.

🔗 Repo: [github.com/HamdiNur/Habit-tracker](https://github.com/HamdiNur/Habit-tracker)

## Features

- ✅ **Add habits** with a name and category
- ☑️ **Mark habits done** for the day with one click
- 🔥 **Current streak** tracking (consecutive days completed)
- 🏆 **Best streak** — your all-time personal record per habit
- 📅 **Weekly view** — see the last 7 days at a glance
- ✏️ **Edit habit names** inline
- 🏷️ **Categories** — Health, Work, Personal, Learning, Other — each with a color-coded badge
- 🗑️ **Delete with confirmation** — no accidental deletions
- 💾 **Persistent storage** — habits are saved in the browser via `localStorage`, so they survive a refresh

## Tech Stack

- [Angular](https://angular.dev/) (standalone components, signals)
- TypeScript
- Plain CSS (no external UI library)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.13+ (v20 recommended)
- npm (comes with Node)

### Installation

```bash
git clone https://github.com/HamdiNur/Habit-tracker.git
cd Habit-tracker
npm install
```

### Run locally

```bash
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

## Project Structure

```
src/
├── app/
│   ├── add-habit/          # Form to add a new habit (name + category)
│   ├── habit-list/         # Renders habits: checkbox, streaks, edit, delete
│   ├── habit.model.ts      # Habit + category types
│   ├── habit.service.ts    # Shared state, streak logic, localStorage
│   ├── app.component.ts    # Root component
│   └── app.config.ts       # App-level providers (Dependency Injection)
├── index.html
├── main.ts
└── styles.css
```

## Angular Concepts Used

This project is also a learning exercise. A few core Angular concepts show up throughout:

| Concept | Where |
|---|---|
| **Dependency Injection** | `HabitService` is `@Injectable({ providedIn: 'root' })` — one shared instance injected into every component that needs it |
| **Two-way binding** | `[(ngModel)]` in the add-habit form and inline name editing |
| **Signals** | `HabitService.habits` is a signal — components re-render automatically when it changes |
| **Structural directives** | `*ngFor` / `*ngIf` throughout the habit list |
| **Standalone components** | No `NgModule` — each component declares its own imports |

## Roadmap

Planned next steps:

- [ ] Routing with a dedicated Stats page (total check-ins, best streak overall, breakdown by category)
- [ ] Reactive Forms for the add-habit form
- [ ] Dark/light theme toggle
- [ ] Sync data with Firebase instead of localStorage

## License

This project is open for learning purposes — feel free to fork and experiment.