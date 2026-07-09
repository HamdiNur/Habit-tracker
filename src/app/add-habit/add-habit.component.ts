import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-add-habit',
  standalone: true,
  imports: [FormsModule], // needed for ngModel to work
  template: `
    <form class="add-form" (ngSubmit)="submit()">
      <!--
        [(ngModel)]="habitName" is Angular's two-way binding syntax
        (nicknamed "banana in a box" for the [( )] shape).
        - The [ ] part pushes habitName -> the input's value
        - The ( ) part listens for input events and pushes the
          typed value back into habitName
        In React you'd write value={habitName} and a separate
        onChange={e => setHabitName(e.target.value)} by hand.
        Angular does both directions with one binding.
      -->
      <input
        class="add-input"
        type="text"
        placeholder="New habit, e.g. Drink water"
        [(ngModel)]="habitName"
        name="habitName"
      />
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
  // This plain string is what ngModel reads/writes above.
  habitName = '';

  // HabitService is "injected" here via the constructor.
  // Angular sees the type HabitService and hands over the single
  // shared instance created by the injector (see habit.service.ts).
  constructor(private habitService: HabitService) {}

  submit(): void {
    this.habitService.addHabit(this.habitName);
    this.habitName = ''; // clears the input after adding
  }
}
