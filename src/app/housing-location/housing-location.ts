import { Component, input } from '@angular/core';
import { HousingLocationInfo } from '../interfaces/housinglocation';
import { LucideLocateFixed, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [LucideAngularModule, RouterLink],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <p class="listing-location">
        <lucide-icon [img]="LucideLocateFixed" class="my-icon" size="32" />
        {{ housingLocation().city }}, {{ housingLocation().state }}
      </p>
      <a [routerLink]="['/details', housingLocation().id]">Learn More</a>
    </section>
  `,
  styleUrl: './housing-location.css',
})

export class HousingLocation {
  readonly LucideLocateFixed = LucideLocateFixed;
  housingLocation = input.required<HousingLocationInfo>();
}
