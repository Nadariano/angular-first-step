import { Component, computed, input, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';
@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
    <section>
      <form class="search-fields">
        <input type="text" placeholder="Filter by name" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <!-- <div>
      <h2>What you are typing: {{ label() }}</h2>
    </div> -->
    <section class="results">
      @for(housingLocation of filteredLocationList; track $index) {
      <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  // value = input('', { transform: trimString });
  // label = computed(() => this.value().toString);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((hl) =>
      hl?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}

// function trimString(value: string | undefined): string {
//   return value?.trim() ?? '';
// }
