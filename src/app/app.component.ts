import { Component } from '@angular/core';
import { AddHabitComponent } from './add-habit/add-habit.component';
import { HabitListComponent } from './habit-list/habit-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddHabitComponent, HabitListComponent],
  template: `
    <main class="page">
      <header class="header">
        <h1>Habit Tracker</h1>
        <p class="subtitle">Small daily wins, tracked simply.</p>
      </header>

      <app-add-habit></app-add-habit>
      <app-habit-list></app-habit-list>
    </main>
  `,
  styles: [`
    .page {
      width: 100%;
      max-width: 480px;
    }
    .header {
      margin-bottom: 24px;
    }
    h1 {
      font-size: 24px;
      margin: 0 0 4px 0;
    }
    .subtitle {
      margin: 0;
      color: var(--text-dim);
      font-size: 14px;
    }
  `]
})
export class AppComponent {}
