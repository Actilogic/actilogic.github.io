import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/services/map/map.service';

@Component({
  selector: 'app-fuel-map',
  templateUrl: './fuel-map.component.html',
  styleUrls: ['./fuel-map.component.scss']
})
export class FuelMapComponent implements OnInit {


  constructor(private map: MapService) { }

  ngOnInit() {


    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            // coordinates: [-32.021389, 115.875188]
            coordinates: [115.875188, -32.021389]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        }
      ]
    };

    this.map.buildMap();
    this.map.addMarkers(geojson);

  }

}
