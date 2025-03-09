import {Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-village-map',
  imports: [
    MatCardModule, MatTableModule, MatPaginatorModule,
    GoogleMapsModule
  ],
  templateUrl: './village-map.component.html',
  styleUrl: './village-map.component.scss'
})
export class VillageMapComponent {
  center: google.maps.LatLngLiteral = { lat: -24.07766, lng: 28.91455 };
  zoom = 14;
  markers = [
    { lat: -24.07602, lng: 28.90298 },
    { lat: -24.06708, lng: 28.91764 },
    { lat: -24.07977, lng: 28.92700 },
    { lat: -24.08857, lng: 28.90753 },
  ];
  options: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom,
  };
  polylineOptions: google.maps.PolylineOptions = {
    path: [...this.markers, this.markers[0]], // Closing the loop by adding first marker at the end
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
}
