# Habit Tracker (Angular)

A tiny beginner project: track daily habits, see your streak, stored in your browser's localStorage.

## Run it

```bash
npm install
npm start
```

Then open the URL shown in the terminal (usually http://localhost:4200).

## Where to look first

- `src/app/habit.service.ts` — the shared data + logic. Look for `@Injectable({ providedIn: 'root' })`, which is Angular's **Dependency Injection**: one instance shared by every component that asks for it.
- `src/app/add-habit/add-habit.component.ts` — look for `[(ngModel)]="habitName"`. That's **two-way binding**: typing in the input updates `habitName`, and if `habitName` changed elsewhere, the input would update too.
- `src/app/habit-list/habit-list.component.ts` — renders the list using `*ngFor` and reads from the same injected `HabitService`.

## Ideas to extend it once it's working

- Add a weekly calendar view instead of just today's checkbox.
- Add habit categories or colors.
- Add a "longest streak ever" stat alongside the current streak.
- Swap localStorage for a real backend (good intro to Angular's `HttpClient`).
