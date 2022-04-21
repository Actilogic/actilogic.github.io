import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from 'src/services/map/map.service';
// remove later
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../environments/environment";
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';


@Component({
  selector: 'app-fuel-map',
  templateUrl: './fuel-map.component.html',
  styleUrls: ['./fuel-map.component.scss']
})

export class FuelMapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/navigation-night-v1';
  lat = -31.9523;
  lng = 115.8613;
  zoom = 12
  @Input() feed = {};

  private geojson = {};

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    // this.test();
    // console.log("this is the feed that came from the feulsaver and now is in the map compont:", this.feed);

    // build map
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
    );
    this.map.addControl(
      new mapboxgl.NavigationControl()
    );

    this.map.on('load', () => {
      // Load an image from an external URL.
      this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the this.map style.
          this.map.addImage('cat', image);

          this.addMarkers();
        }
      );
    });

    // When a click event occurs on a feature in the stations layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    this.map.on('click', 'stations', (station) => {
      console.log(station.features[0]);
      // Copy coordinates array.
      const coordinates = station.features[0].geometry.coordinates.slice();
      const descriptionHTML = JSON.parse(station.features[0].properties.popup).html;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(station.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += station.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(descriptionHTML)
        .addTo(this.map);
    });

    // Change the cursor to a pointer when the mouse is over the stations layer.
    this.map.on('mouseenter', 'stations', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'stations', () => {
      this.map.getCanvas().style.cursor = '';
    });

  }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'feed') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.FuelWatchFeedtoGeoJSON(changes[property].currentValue);
        this.addMarkers();
      }
    }
  }



  addMarkers() {
    console.log("adding from this", this.geojson)
    var fuelStationsLayer = this.map.getSource('fuelStations');

    if (fuelStationsLayer) {
      fuelStationsLayer.setData(this.geojson)
    }
    else {
      // Add a data source containing one point feature.
      this.map.addSource('fuelStations', {
        'type': 'geojson',
        'data': this.geojson
      });

    }

    // Add a layer to use the image to represent the data.
    this.map.addLayer({
      'id': 'stations',
      'type': 'symbol',
      'source': 'fuelStations', // reference the data source
      'layout': {
        'icon-image': 'cat', // reference the image
        'icon-size': 0.1
      }
    });

  }


  FuelWatchFeedtoGeoJSON(feed: FuelWatchFeed) {
    var outGeoJson = {
      type: 'FeatureCollection',
      features: []
    };

    feed.item.forEach((fuelStation) => {
      outGeoJson.features.push(
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              <number><unknown>fuelStation.longitude,
              <number><unknown>fuelStation.latitude,
            ]
          },
          properties: {
            title: fuelStation.title,
            description: fuelStation.description,
            popup: {
              html: this.toPopUp(fuelStation), // add content inside the marker, in this case a star
            },
          }
        }
      );
    }
    )

    this.geojson = outGeoJson;

  }

  toPopUp(fuelStation): string {
    var outPopUp: string = "";




    
    return outPopUp
  }

}
