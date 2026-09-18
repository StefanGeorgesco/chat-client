import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

import { GeoService } from '../service/geo.service';
import type { Restaurant } from '../geo.type';
import { environment } from '../../../environments/environment';

const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: 48.8566, lng: 2.3522 };

@Component({
  imports: [FormsModule, GoogleMap, MapAdvancedMarker],
  providers: [GeoService],
  selector: 'app-geo.component',
  styleUrl: './geo.component.css',
  templateUrl: './geo.component.html',
})
export class GeoComponent {
  private readonly geoService = inject(GeoService);
  restaurantIdInput = model('');
  restaurants = signal<Restaurant[]>([]);
  wasSearched = signal(false);
  searchedId = signal('');

  mapCenter = computed<google.maps.LatLngLiteral>(() => {
    const searched = this.restaurants().find((restaurant) => restaurant.id === this.searchedId());
    return searched ? { lat: searched.latitude, lng: searched.longitude } : DEFAULT_CENTER;
  });

  mapOptions: google.maps.MapOptions = { mapId: 'DEMO_MAP_ID' };

  constructor() {
    this.loadGoogleMapsApi();
  }

  onSearch() {
    this.wasSearched.set(false);
    this.searchedId.set(this.restaurantIdInput());
    const sub = this.geoService
      .getRestaurantsCloseTo(this.restaurantIdInput())
      .subscribe((restaurants) => {
        sub.unsubscribe();
        this.restaurants.set(restaurants);
        this.wasSearched.set(true);
      });
    this.restaurantIdInput.set('');
  }

  private loadGoogleMapsApi() {
    if (typeof google !== 'undefined' || document.getElementById('google-maps-script')) {
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker&loading=async`;
    script.async = true;
    document.head.appendChild(script);
  }
}
