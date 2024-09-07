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
        <input type="text" placeholder="filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredHousingLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocationList = housingLocationList;
    })
  }

  filterResults(text: string){
    if (!text) {
      this.filteredHousingLocationList = this.housingLocationList
    };
    this.filteredHousingLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()))
  }
}
