import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FuelWatchService {

  // url to the fuel watch rss
  private fuelWatchURL: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";
  private CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";

  constructor(
    private http: HttpClient,
  ) {
  }

  /** GET fuelwatch data from the server */
  public get(): Observable<FuelWatchFeed> {
    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    // dont need it if this is hosted online, and in production
    var apiurl: string = environment.production ? this.fuelWatchURL : this.CORS_PROXY + this.fuelWatchURL;
    console.log("fetching from", apiurl)
    // return this.http.get<any>(apiurl);
    return this.http.get<any>("/FuelWatchAPI/");
  }


  public static test() {

    console.log("test function called");
    return "this is the returened data from test";
  }

}


