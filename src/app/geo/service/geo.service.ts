import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from '../geo.type';
import { environment } from '../../../environments/environment';

@Service()
export class GeoService {
  private readonly httpClient = inject(HttpClient);
  private readonly geoApiUrl = environment.geoApiUrl;

  getRestaurantsCloseTo(restaurantId: string) {
    return this.httpClient.get<Restaurant[]>(`${this.geoApiUrl}/${restaurantId}`);
  }
}
