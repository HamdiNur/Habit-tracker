export interface Habit {
  id: string;
  name: string;
  // dates (YYYY-MM-DD) on which this habit was marked done
  completedDates: string[];
}
