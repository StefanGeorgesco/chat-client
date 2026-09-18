import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { Restaurant } from '../geo.type';
import { GeoService } from '../service/geo.service';

@Component({
  imports: [FormsModule],
  providers: [GeoService],
  selector: 'app-geo.component',
  styleUrl: './geo.component.css',
  templateUrl: './geo.component.html',
})
export class GeoComponent {
  private readonly geoService = inject(GeoService);
  restaurantId = model('');
  restaurants = signal<Restaurant[]>([]);
  searched = signal(false);

  onSearch() {
    this.searched.set(false);
    const sub = this.geoService
      .getRestaurantsCloseTo(this.restaurantId())
      .subscribe((restaurants) => {
        sub.unsubscribe();
        this.restaurants.set(restaurants);
        this.searched.set(true);
      });
    this.restaurantId.set('');
  }
}
