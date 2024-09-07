import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
   <article>
      <img class="listing-photo" [src]="housingLocation?.photo" [alt]="housingLocation?.name">
      <section class="listing-description">
        <h2 class="listing-title">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="">About the housing location</h2>
        <ul>
          <li>wifi: {{ housingLocation?.wifi }}</li>
          <li>laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply Now to Live</h2>
        <button class="primary">Apply</button>
      </section>
   </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']); // get id from the route
    this.housingLocation = this.housingService.getAllHousingLocationById(housingLocationId);
  }

}
