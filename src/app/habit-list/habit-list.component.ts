import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../habit.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // gives us *ngFor, *ngIf
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
           <input
            *ngIf="editingId === habit.id; else nameDisplay"
            class="name-input"
            type="text"
            [(ngModel)]="editingName"
            (keyup.enter)="saveEdit(habit.id)"
            (keyup.escape)="cancelEdit()"
            (blur)="saveEdit(habit.id)"
          />
          <ng-template #nameDisplay>
            <span class="name" (click)="startEdit(habit)">{{ habit.name }}</span>
            <span class="badge" [class]="'badge-' + habit.category">{{ habit.category }}</span>
          </ng-template>
          <span class="streak">🔥 {{ habitService.currentStreak(habit) }} day streak</span>
          <span class="best-streak">🏆 Best: {{ habit.bestStreak }} days</span>
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

       <button
          *ngIf="confirmingDeleteId !== habit.id"
          class="delete"
          (click)="confirmingDeleteId = habit.id"
          aria-label="Delete habit"
        >
          ✕
        </button>
        <div *ngIf="confirmingDeleteId === habit.id" class="confirm-delete">
          <button class="confirm-yes" (click)="habitService.deleteHabit(habit.id); confirmingDeleteId = null">
            Delete
          </button>
          <button class="confirm-no" (click)="confirmingDeleteId = null">
            Cancel
          </button>
        </div>
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
      .name {
      cursor: pointer;
    }
    .name-input {
      font-size: 14px;
      font-weight: 500;
      background: var(--surface-hover);
      border: 1px solid var(--accent);
      border-radius: 4px;
      color: var(--text);
      padding: 2px 6px;
      font-family: inherit;
      width: 100%;
    }
    .streak {
      font-size: 12px;
      color: var(--text-dim);
    }
      .best-streak {
      font-size: 11px;
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
      .confirm-delete {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    .confirm-yes {
      background: var(--danger);
      color: #2a0d0d;
      border: none;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }
    .confirm-no {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-dim);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 11px;
      cursor: pointer;
    }
    .badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      width: fit-content;
      margin-top: 2px;
    }
    .badge-Health { background: #1f4d3d; color: #6ee7b7; }
    .badge-Work { background: #1e3a5f; color: #7dd3fc; }
    .badge-Personal { background: #4a1f5f; color: #d8b4fe; }
    .badge-Learning { background: #5f3a1f; color: #fdba74; }
    .badge-Other { background: #3a3a3a; color: #cbd5e1; }
  `]
})
export class HabitListComponent {
  // Same DI pattern as AddHabitComponent: Angular injects the one
  // shared HabitService instance. Both components stay in sync
  // automatically because they're reading/writing the same signal.
  constructor(public habitService: HabitService) {}
  editingId: string | null = null;
  editingName = '';
  confirmingDeleteId: string | null = null;


  startEdit(habit: { id: string; name: string }): void {
    this.editingId = habit.id;
    this.editingName = habit.name;
  }

  saveEdit(id: string): void {
    if (this.editingId === null) return;
    this.habitService.renameHabit(id, this.editingName);
    this.editingId = null;
  }

  cancelEdit(): void {
    this.editingId = null;
  }
}
