import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { environment } from 'src/environments/environment';
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { BehaviorSubject, observable, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class FuelWatchService {

  // url to the fuel watch rss
  private fuelWatchURL: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";
  private CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";
  private ngxXml2jsonService: NgxXml2jsonService = new NgxXml2jsonService();
  private _allLocations: BehaviorSubject<FuelWatchFeed> = new BehaviorSubject(new FuelWatchFeed());
  private feed: FuelWatchFeed = new FuelWatchFeed();
  private allLocations: Observable<FuelWatchFeed> = this._allLocations.asObservable();


  constructor(
    private http: HttpClient,
    private messageService: MessageService,

  ) {
  }

  /** GET fuelwatch data from the server */
  // public get(): Observable<FuelWatchFeed> {
  public get(): Observable<any> {

    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    // dont need it if this is hosted online, and in production
    var apiurl: string = environment.production ? this.fuelWatchURL : this.CORS_PROXY + this.fuelWatchURL;
    var albums_url: string = "https://jsonplaceholder.typicode.com/albums";
    var a = this.http.get<any>(albums_url).pipe(
      tap(data => {
        console.log('All data: ', data);
        console.log('All: ' + JSON.stringify(data));
      }
      )
    );

    console.log("a", a);
    return a;

    // console.log("calling it yeet");
    // this.http.get<any>(apiurl).pipe((res: any) => {
    //   console.log('res', res);
    //   return res;
    // });

    // .map().subscribe(
    //   (response) => {                           //Next callback
    //     var obj: any = this.parseXML(response);
    //     console.log("making the local _allLocations into the feed from success message", <FuelWatchFeed>obj.rss.channel)
    //     this._allLocations = new BehaviorSubject(obj.rss.channel);
    //     this.feed = <FuelWatchFeed>obj.rss.channel;
    //     return this.feed;
    //   },
    //   (error) => {                              //Error callback
    //     if (!environment.production) {

    //       var response: string = error.error.text;
    //       var obj: any = this.parseXML(response)
    //       console.log("making the local _allLocations into the feed from error message", <FuelWatchFeed>obj.rss.channel)
    //       this._allLocations = new BehaviorSubject(obj.rss.channel);
    //       this.feed = <FuelWatchFeed>obj.rss.channel;
    //       console.log("this is the final feed object being returned", this.feed);
    //       console.log("_ allLocations", this._allLocations);
    //       this.allLocations = this._allLocations.asObservable()
    //       console.log("allLocations", this.allLocations);
    //       return this.feed;
    //     } else {
    //       console.error("an error has occured when calling the fuel watch api")
    //       return this.feed;
    //     }

    //     //throw error;   //You can also throw the error to a global error handler
    //   }
    // )
    // // console.log("called it yeet", a);

  }
  public asObservable(subject: any) {
    return new Observable(fn => subject.subscribe(fn));
  }

  public parseXML(xmlString: string): FuelWatchFeed {
    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlString, 'text/xml');
    var obj = <FuelWatchFeed>this.ngxXml2jsonService.xmlToJson(xml);
    return obj;
  }

  public static test() {
    console.log("test function called");
    return "this is the returened data from test";
  }

}


