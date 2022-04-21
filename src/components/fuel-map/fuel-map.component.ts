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

  private geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            this.lng,
            this.lat
          ]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            115.8213,
            this.lat
          ]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

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

    // console.log("loaded the map, loading the markers");
    // this.addMarkers(geojson)
    // // this.map.buildMap();
    // // this.map.addMarkers(geojson);

  }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'feed') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.geojson = this.FuelWatchFeedtoGeoJSON(changes[property].currentValue);
        this.addMarkers();
      }
    }
  }



  addMarkers() {
    console.log("adding from this", this.geojson)
    var fuelStationsLayer = this.map.getSource('fuelStations');

    if (fuelStationsLayer) {
      fuelStationsLayer.setData(this.geojson)

      // Add a layer to use the image to represent the data.
      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'fuelStations', // reference the data source
        'layout': {
          'icon-image': 'cat', // reference the image
          'icon-size': 0.1
        }
      })
    }
    else {

      // Add a data source containing one point feature.
      this.map.addSource('fuelStations', {
        'type': 'geojson',
        'data': this.geojson
      });

      // Add a layer to use the image to represent the data.
      this.map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'fuelStations', // reference the data source
        'layout': {
          'icon-image': 'cat', // reference the image
          'icon-size': 0.1
        }
      });
    }


  }

  // for (const feature of this.geojson.features) {
  //   // create a HTML element for each feature
  //   const el = document.createElement('div');
  //   el.className = 'marker';
  //   // make a marker for each feature and add to the map
  //   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(this.map);
  // }

  FuelWatchFeedtoGeoJSON(feed: FuelWatchFeed) {
    var outGeoJson = {
      type: 'FeatureCollection',
      features: []
    };

    feed.item.forEach((fuelStation) => {
      console.log("this is the individual items in the list", fuelStation);
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
            icon: {
              className: 'my-icon icon-dc', // class name to style
              html: 'asdfasdf', // add content inside the marker, in this case a star
              iconSize: null // size of icon, use null to set the size in CSS
            },
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': 'rocket'
          }
        }
      );
      console.log("this is the geojson", outGeoJson)
    }
    )

    return outGeoJson;

  }


}
