import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/services/map/map.service';

@Component({
  selector: 'app-fuel-map',
  templateUrl: './fuel-map.component.html',
  styleUrls: ['./fuel-map.component.scss']
})
export class FuelMapComponent implements OnInit {


  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap()
  }

}
