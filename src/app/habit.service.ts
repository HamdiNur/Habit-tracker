import { Injectable, signal } from '@angular/core';
import { Habit } from './habit.model';

const STORAGE_KEY = 'habit-tracker.habits';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// @Injectable({ providedIn: 'root' }) is the key line for Dependency Injection.
// It tells Angular: "create exactly ONE instance of this service for the
// whole app, and hand it to any component that asks for it in its
// constructor." No component ever does `new HabitService()` themselves —
// Angular's injector does that job. This is what lets HabitListComponent
// and AddHabitComponent share the same data without passing it manually
// through inputs/outputs.
@Injectable({ providedIn: 'root' })
export class HabitService {
  // signal() is Angular's reactive state container. Components that read
  // habits() in their template automatically re-render when it changes.
  habits = signal<Habit[]>(this.load());

  private load(): Habit[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private save(list: Habit[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this.habits.set(list);
  }

addHabit(name: string, category: Habit['category']): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: trimmed,
      category,
      completedDates: []
    };
    this.save([...this.habits(), newHabit]);
  }

  deleteHabit(id: string): void {
    this.save(this.habits().filter((h) => h.id !== id));
  }
  renameHabit(id: string, newName: string): void {
    const trimmed = newName.trim();
    if (!trimmed) return; // ignore empty names
    const updated = this.habits().map((h) =>
      h.id === id ? { ...h, name: trimmed } : h
    );
    this.save(updated);
  }

  toggleToday(id: string): void {
    const today = todayStr();
    const updated = this.habits().map((h) => {
      if (h.id !== id) return h;
      const done = h.completedDates.includes(today);
      const completedDates = done
        ? h.completedDates.filter((d) => d !== today)
        : [...h.completedDates, today];
      return { ...h, completedDates };
    });
    this.save(updated);
  }

  isDoneToday(habit: Habit): boolean {
    return habit.completedDates.includes(todayStr());
  }

  // Counts consecutive days (ending today or yesterday) the habit was done.
  currentStreak(habit: Habit): number {
    const done = new Set(habit.completedDates);
    let streak = 0;
    let cursor = new Date();

    // If not done today yet, streak still counts from yesterday backwards.
    if (!done.has(todayStr())) {
      cursor.setDate(cursor.getDate() - 1);
    }

    while (done.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }
  // Returns the last 7 days (oldest to newest) with whether the habit
  // was completed on each one, plus a short weekday label for display.
  last7Days(habit: Habit): { date: string; label: string; done: boolean }[] {
    const done = new Set(habit.completedDates);
    const days: { date: string; label: string; done: boolean }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en-US', { weekday: 'narrow' }); // "M", "T", "W"...
      days.push({ date: dateStr, label, done: done.has(dateStr) });
    }

    return days;
  }
}
