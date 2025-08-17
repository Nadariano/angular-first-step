import { Component } from '@angular/core';
import { Home } from './home/home';
import { LucideAngularModule, LucideHousePlus } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [
    Home,
    LucideAngularModule
  ],
  template: `
    <main>
      <header class="brand-name">
        <lucide-icon [img]="LucideHousePlus" class="my-icon" size="80"/>
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'homes';
  readonly LucideHousePlus = LucideHousePlus;
}
