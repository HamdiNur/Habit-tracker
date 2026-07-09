export type HabitCategory = 'Health' | 'Work' | 'Personal' | 'Learning' | 'Other';

export const HABIT_CATEGORIES: HabitCategory[] = [
  'Health',
  'Work',
  'Personal',
  'Learning',
  'Other'
];

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  completedDates: string[];
  bestStreak: number;
}