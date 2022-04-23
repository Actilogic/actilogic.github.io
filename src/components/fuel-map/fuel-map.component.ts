import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from 'src/services/map/map.service';
// remove later
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../environments/environment";
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { FuelWatchItem } from 'src/models/fuelwatchitem.model';
import { PopupComponent } from "../popup/popup.component";
import { LocationService } from '../../services/location/location.service';
import { retry } from 'rxjs-compat/operator/retry';
@Component({
  selector: 'app-fuel-map',
  templateUrl: './fuel-map.component.html',
  styleUrls: ['./fuel-map.component.scss']
})

export class FuelMapComponent implements OnInit {
  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/navigation-night-v1';
  style = 'mapbox://styles/mapbox/outdoors-v11';
  lat = -31.9523;
  lng = 115.8613;
  perth = [this.lng, this.lat];
  currentLocation = this.perth;
  zoom = 13;
  @Input() feed = {};

  private geojson = {};
  private locationService: LocationService = new LocationService();

  constructor(
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    // this.test();
    // console.log("this is the feed that came from the feulsaver and now is in the map compont:", this.feed);

    // build map
    var currentLocation = this.getLocation();
    setTimeout(() => { }, 10)
    this.map = new mapboxgl.Map(
      {
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: this.currentLocation
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
          this.addFuelStations();
        }
      );

      // load user image 
      this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
          if (error) throw error;
          // Add the image to the this.map style.
          this.map.addImage('cat', image);
          this.addFuelStations();
        }
      );


      // // load the user location
      // if (navigator.geolocation) {
      //   console.log("before flying ", this.currentLocation);
      //   navigator.geolocation.getCurrentPosition(this.goTo);

      // }


    });

    // When a click event occurs on a feature in the stations layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    this.map.on('click', 'stations', (station) => {

      // Copy coordinates array.
      const coordinates = station.features[0].geometry.coordinates.slice();
      const descriptionHTML = JSON.parse(station.features[0].properties.popup).html;
      console.log(station.features[0]);

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


      // //-----------------------
      // // This is the test for the popup
      // //-----------------------

      // // Inject Component and Render Down to HTMLDivElement Object
      // let popupContent = this.dynamicComponentService.injectComponent(PopupComponent);

      // console.log(popupContent);
      // new mapboxgl.Popup({ closeOnClick: false })
      //   .setLngLat(coordinates)
      //   .setHTML(popupContent)
      //   .addTo(this.map);


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

  goTo(location) {
    console.log("location", location);
    // var currentLocation = [location.coords.longitude, location.coords.latitude];

    console.log("about to fly to 1", location);

    this.map.flyTo({
      center: location,
      zoom: this.zoom + 5,
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



  addUser() {
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

    this.map.addSource('fuelStations', {
      'type': 'geojson',
      'data': this.geojson
    });
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
              html: this.toPopup(fuelStation), // add content inside the marker, in this case a star
            },
          }
        }
      );
    }

    )



    this.geojson = outGeoJson;

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
                            Directions
                            <mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color"
                                aria-hidden="true" data-mat-icon-type="font">
                                directions
                            </mat-icon>
                        </span>
                        <span matripple="" class="mat-ripple mat-button-ripple"></span>
                        <span class="mat-button-focus-overlay"> </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<app-popup></app-popup>


<script>

const btn = document.getElementById("calcCost");
btn.addEventListener("click", handleClick);

function handleClick() {
  console.log("hello");
  console.log("this is the popup", this);
  alert("hello");
};

</script>
` ;




    return outPopUp
  }

  testMap() { alert("clicked the calc button on popup") }

  getLocation() {
    this.locationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      // alert(`you are located at: ${pos.lat} ${pos.lng}`);
      this.currentLocation = [pos.lng, pos.lat]
      this.goTo(this.currentLocation)
    });
  }

}
