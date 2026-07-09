import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule], // gives us *ngFor, *ngIf
  template: `
    <div *ngIf="habitService.habits().length === 0" class="empty">
      No habits yet. Add one above to start tracking.
    </div>

    <ul class="list">
      <li *ngFor="let habit of habitService.habits()" class="row">
        <button
          class="check"
          [class.done]="habitService.isDoneToday(habit)"
          (click)="habitService.toggleToday(habit.id)"
          [attr.aria-label]="'Mark ' + habit.name + ' done today'"
        >
          {{ habitService.isDoneToday(habit) ? '✓' : '' }}
        </button>

      <div class="info">
          <span class="name">{{ habit.name }}</span>
          <span class="streak">🔥 {{ habitService.currentStreak(habit) }} day streak</span>
          <div class="week">
            <div
              *ngFor="let day of habitService.last7Days(habit)"
              class="day-dot"
              [class.done]="day.done"
              [title]="day.date"
            >
              {{ day.label }}
            </div>
          </div>
        </div>

        <button class="delete" (click)="habitService.deleteHabit(habit.id)" aria-label="Delete habit">
          ✕
        </button>
      </li>
    </ul>
  `,
  styles: [`
    .empty {
      color: var(--text-dim);
      font-size: 14px;
      text-align: center;
      padding: 24px 0;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
    }
    .check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: transparent;
      color: var(--accent);
      font-weight: bold;
      cursor: pointer;
      flex-shrink: 0;
    }
    .check.done {
      background: var(--accent-dim);
      border-color: var(--accent);
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 14px;
      font-weight: 500;
    }
    .streak {
      font-size: 12px;
      color: var(--text-dim);
    }
    .week {
      display: flex;
      gap: 4px;
      margin-top: 6px;
    }
    .day-dot {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid var(--border);
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-dim);
    }
    .day-dot.done {
      background: var(--accent-dim);
      border-color: var(--accent);
      color: var(--text);
    }
    .delete {
      background: transparent;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      font-size: 14px;
    }
    .delete:hover {
      color: var(--danger);
    }
  `]
})
export class HabitListComponent {
  // Same DI pattern as AddHabitComponent: Angular injects the one
  // shared HabitService instance. Both components stay in sync
  // automatically because they're reading/writing the same signal.
  constructor(public habitService: HabitService) {}
}
