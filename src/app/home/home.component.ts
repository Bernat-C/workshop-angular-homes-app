import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
    <form>
      <input type="text" #searchCity placeholder="Filter by city">
      <button class="primary" type="button" (click)="filterList(searchCity.value)">Search</button>
    </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of housingLocationList" [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  filterList(s: string){
    this.housingLocationList = this.housingService.getAllHousingLocations().filter(x => x.city.toLowerCase().startsWith(s.toLowerCase()))
  }
}
