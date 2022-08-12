import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
// import { DynamicChildComponent } from './dynamic-child/dynamic-child.component';
import { DynamicChildLoaderDirective } from '../../directives/load-child.directive';
// remove later
import { environment } from "../../environments/environment";
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { FuelWatchItem } from 'src/models/fuelwatchitem.model';
import { LocationService } from '../../services/location/location.service';

// for the map
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// For the popup
import { PopupComponent } from "../popup/popup.component";
import { DynamicComponentService } from "../../services/dynamic-component/dynamic-component.service";
import { FactoryTarget } from '@angular/compiler';
import { stat } from 'fs';


@Component({
  selector: 'app-fuel-map',
  templateUrl: './fuel-map.component.html',
  styleUrls: ['./fuel-map.component.scss']
})

export class FuelMapComponent implements OnInit {



  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/navigation-night-v1';
  // style = 'mapbox://styles/mapbox/outdoors-v11';
  style = 'mapbox://styles/antoniojoboy/cl2569rep000415mf7upq7j1m';
  lat = -31.9523;
  lng = 115.8613;

  // Default locations
  perth = {
    lng: this.lng,
    lat: this.lat,
    coordinates: [this.lng, this.lat]
  };

  currentLocation = this.perth.coordinates;

  // Map customizations
  zoom = 13;
  Icon_pump = '../../assets/Mapbox-marker/Fuel-Saver/pump-256x256.png';
  // Icon_car = '../../assets/Mapbox-marker/Fuel-Saver/car-256x256.png';
  directions: MapboxDirections;


  private dynamicComponentService: DynamicComponentService

  private geojson = {};

  private locationService: LocationService = new LocationService();

  @Output() fuelMap_distance = new EventEmitter<number>();
  @Output() fuelMap_price = new EventEmitter<number>();
  @Input() feed = {};
  @ViewChild(DynamicChildLoaderDirective, { static: true }) dynamicChild!: DynamicChildLoaderDirective;

  constructor(
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: true,
      unit: 'metric'
    })
  }

  // private loadDynamicComponent() {
  //   this.dynamicChild.viewContainerRef.createComponent(<FactoryTarget>PopupComponent);
  // }

  ngOnInit() {
    // this.loadDynamicComponent();

    // build map
    this.map = new mapboxgl.Map(
      {
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: this.currentLocation
      }
    );

    this.addMapControls();

    this.map.on('load', () => {
      // Go to current locations
      this.gotoCurrentLocation()

      // Load an image from an external URL.
      this.map.loadImage(
        this.Icon_pump,
        (error, image) => {
          if (error) throw error;
          // Add the image to the this.map style.
          this.map.addImage('pump', image);
          this.addFuelStations();
        }
      );

      // load user image 
      // this.addUser();

    });

    // When a click event occurs on a feature in the stations layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    this.map.on('click', 'stations', (station) => {
      // alert("station clicked");
      // // Copy coordinates array.
      var price = station.features[0].properties.price;
      var coordinates = station.features[0].geometry.coordinates.slice();
      var descriptionHTML = JSON.parse(station.features[0].properties.popup).html;
      console.log("station.features[0]", station.features[0]);
      var f = this.map.queryRenderedFeatures(station.point, { layers: ['stations'] });
      var feature = f;
      if (f.length) {
        feature = f[0];
      }



      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(station.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += station.lngLat.lng > coordinates[0] ? 360 : -360;
      }


      console.log("feature()", feature);

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(descriptionHTML)
        .addTo(this.map);

      // the event listener is scoped to this onload function which is why we need to do this
      // estabilishes this feed as 'this' so can be used in event listener
      var self = this;

      // add the event listener for when you want to click the directions button
      document.getElementById("calcCost").addEventListener("click", function () {
        self.directions.setOrigin(self.currentLocation)
        // dont forget that the json object that is returned is all string, so need to convert to numbers 
        // so that the directions and cooredinates can be set
        var destination = <number>JSON.parse(feature.properties.coordinates);
        self.directions.setDestination(destination)

        console.log("self.current location", self.currentLocation);
        console.log("self.directions", self.directions);

        self.fuelMap_price.emit(price);

        getDistanceBetweenPoints('driving-traffic', self.currentLocation, destination).then((distanceData) => {
          console.log("distanceData", distanceData);
          // sends this data to the calc component 
          self.fuelMap_distance.emit(distanceData);
        });

      });

    });



    async function getDistanceBetweenPoints(routingProfile, pointA, pointB) {
      /**
       * Get the distance between points  
      */
      var origin = pointA.join(",");
      var destination = pointB.join(",");
      var coordinates = `${origin};${destination}`;
      console.log("getting distance between", origin, destination);
      var mapBoxApi = `https://api.mapbox.com/directions/v5/mapbox/${routingProfile}/${coordinates}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;

      const query = await fetch(
        mapBoxApi,
        { method: 'GET' }
      );

      const directionJSON = await query.json();
      var distance = directionJSON.routes[0].distance;
      console.log("directionJSON", directionJSON);
      console.log("distance", distance);
      return distance;
    }


    // Change the cursor to a pointer when the mouse is over the stations layer.
    this.map.on('mouseenter', 'stations', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'stations', () => {
      this.map.getCanvas().style.cursor = '';
    });

  }

  addMapControls() {

    // Add search functionality 
    this.map.addControl(
      new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Do not use the default marker style
        placeholder: '  Search for places', // Placeholder text for the search bar
        // bbox: [this.perth.lng - 0.1, this.perth.lat - 0.05,this.perth.lng + 0.1, this.perth.lat + 0.1 ], // Boundary for Perth
        proximity: {
          longitude: this.perth.lng,
          latitude: this.perth.lat,
        } // Coordinates of Perth
      })
    );

    // add the directions
    this.map.addControl(
      this.directions,
      'top-right'
    );


    // add navigation controls
    this.map.addControl(
      new mapboxgl.NavigationControl(), 'bottom-right'
    );

    // Add geolocate control to the map, to go to current location.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        // showUserHeading: true
      }), 'bottom-right'
    );

  }


  goTo(location) {
    console.log("location", location);
    // var currentLocation = [location.coords.longitude, location.coords.latitude];

    console.log("about to fly to 1", location);

    this.map.flyTo({
      center: location,
      zoom: this.zoom + 3,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });

    console.log("flew");
  }


  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'feed') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.FuelWatchFeedtoGeoJSON(changes[property].currentValue);
        this.addFuelStations();
      }
    }
  }


  addFuelStations() {
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
        'icon-image': 'pump', // reference the image
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
            price: fuelStation.price,
            popup: {
              html: this.toPopup(fuelStation), // add content inside the marker, in this case a star
            },
            coordinates: [
              <number><unknown>fuelStation.longitude,
              <number><unknown>fuelStation.latitude,
            ]
          }
        }
      );
    }

    )
    this.geojson = outGeoJson;
    console.log("this.geojson", this.geojson);

  }

  toPopup(fuelStation: FuelWatchItem): string {
    var outPopUp: string = `
    <div class="simplebar-content" style="padding: 0px;">
    <div class="fuel-station__name-wrapper">
        <div class="container-fluid">

            <div class="row position-relative">
                <div class="col-8 col-lg-9">
                    <div>
                        <h2>${fuelStation["trading-name"]}</h2>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="fuel-station__address-wrapper">

        <hr class="divider">

        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <span>Address: ${fuelStation.address}</span>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="fuel-station__contact-number">
                        Call: <a href="tel:${fuelStation.phone}">${fuelStation.phone}</a>
                    </div>
                </div>
            </div>

            <hr class="divider">

        </div>

    </div>

    <div class="fuel-station__pricing-wrapper ng-star-inserted">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h4 class="fuel-price__title">ULP prices</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-6 ng-star-inserted">
                    <div>
                        <p class="h2">
                            ${fuelStation.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fuel-station__direction-wrapper ng-star-inserted">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <button id="calcCost" 
                        <span class="mat-button-wrapper">
                            Calculate cost to get there
                        </span>
                        <span matripple="" class="mat-ripple mat-button-ripple"></span>
                        <span class="mat-button-focus-overlay"> </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
` ;




    return outPopUp
  }

  test() {
    alert("testing function")
  }

  gotoCurrentLocation() {
    this.locationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      // alert(`you are located at: ${pos.lat} ${pos.lng}`);
      this.currentLocation = [pos.lng, pos.lat]
      this.goTo(this.currentLocation)
    });


  }

  getLocation() {
    this.locationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }

}
