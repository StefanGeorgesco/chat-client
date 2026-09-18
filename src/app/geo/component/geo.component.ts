import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GeoService } from '../service/geo.service';

@Component({
  imports: [FormsModule],
  providers: [GeoService],
  selector: 'app-geo.component',
  styleUrl: './geo.component.css',
  templateUrl: './geo.component.html',
})
export class GeoComponent {
  onSubmit() {
    // TO DO
  }
}
