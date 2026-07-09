import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../habit.service';
import { CommonModule } from '@angular/common';
import { HABIT_CATEGORIES, HabitCategory } from '../habit.model';

@Component({
  selector: 'app-add-habit',
  standalone: true,
    imports: [FormsModule, CommonModule],// needed for ngModel to work
  template: `
    <form class="add-form" (ngSubmit)="submit()">
      <input
        class="add-input"
        type="text"
        placeholder="New habit, e.g. Drink water"
        [(ngModel)]="habitName"
        name="habitName"
      />
      <select class="category-select" [(ngModel)]="selectedCategory" name="category">
        <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
      </select>
      <button class="add-btn" type="submit">Add</button>
    </form>
  `,
  styles: [`
    .add-form {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }
    .add-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 14px;
      outline: none;
    }
    .add-input:focus {
      border-color: var(--accent);
    }
    .category-select {
      padding: 10px 8px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 14px;
    }
    .add-btn {
      padding: 10px 18px;
      border-radius: 8px;
      border: none;
      background: var(--accent);
      color: #0c1210;
      font-weight: 600;
      cursor: pointer;
    }
    .add-btn:hover {
      opacity: 0.9;
    }
  `]
})
export class AddHabitComponent {
  habitName = '';
  categories = HABIT_CATEGORIES;
  selectedCategory: HabitCategory = 'Health';

  constructor(private habitService: HabitService) {}

  submit(): void {
    this.habitService.addHabit(this.habitName, this.selectedCategory);
    this.habitName = '';
  }
}