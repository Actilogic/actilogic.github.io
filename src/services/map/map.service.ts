import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/navigation-night-v1';
  lat = -32.021389;
  lng = 115.875188;
  zoom = 12

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  addMarkers(geojson) {
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(this.map);
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map(
      {
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center:
          [
            this.lng,
            this.lat
          ]
      }
    )
    this.map.addControl(
      new mapboxgl.NavigationControl()
    );
  }
}