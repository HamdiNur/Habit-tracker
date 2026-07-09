import { ApplicationConfig } from '@angular/core';

// providers is Angular's Dependency Injection registry.
// Anything listed here (or marked @Injectable({ providedIn: 'root' })
// like our HabitService) becomes available to be "injected" into
// any component's constructor, without that component needing to
// know how to create it.
export const appConfig: ApplicationConfig = {
  providers: []
};
