import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// This is where an Angular app actually starts.
// bootstrapApplication wires the root component together with
// the "providers" listed in app.config.ts (this is Dependency
// Injection setup happening at the top level of the app).
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
