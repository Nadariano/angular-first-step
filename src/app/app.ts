import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LucideAngularModule],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <h1>Angular-first-step</h1>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'Main';
}
