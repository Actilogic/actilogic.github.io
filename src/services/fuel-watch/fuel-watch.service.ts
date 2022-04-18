import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { environment } from 'src/environments/environment';
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { BehaviorSubject, observable, Observable, Subject, throwError } from 'rxjs';
import { List } from 'immutable';

@Injectable({
  providedIn: 'root'
})

export class FuelWatchService {

  // url to the fuel watch rss
  private fuelWatchURL: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";
  private CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";
  private ngxXml2jsonService: NgxXml2jsonService = new NgxXml2jsonService();
  private _allLocations: BehaviorSubject<FuelWatchFeed> = new BehaviorSubject(new FuelWatchFeed());

  public readonly allLocations: Observable<FuelWatchFeed> = this._allLocations.asObservable();


  constructor(
    private http: HttpClient,
    private messageService: MessageService,

  ) {
  }

  /** GET fuelwatch data from the server */
  public get(): Observable<FuelWatchFeed> {
    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    // dont need it if this is hosted online, and in production
    var apiurl: string = environment.production ? this.fuelWatchURL : this.CORS_PROXY + this.fuelWatchURL;
    var behaviorSubject = new BehaviorSubject(null);
    let currentValue = behaviorSubject.getValue();
    behaviorSubject.subscribe(value => console.log('Received new subject value: '))
    console.log(behaviorSubject);

    console.log("calling it yeet");
    this.http.get<any>(apiurl).subscribe(
      (response) => {                           //Next callback
        var obj: any = this.parseXML(response);
        console.log("making the local _allLocations into the feed")
        this._allLocations = new BehaviorSubject(obj.rss.channel);
      },
      (error) => {                              //Error callback
        if (!environment.production) {

          var response: string = error.error.text;
          var obj: any = this.parseXML(response)
          console.log("making the local _allLocations into the feed")
          this._allLocations = new BehaviorSubject(obj.rss.channel);
        } else {
          console.error("an error has occured when calling the fuel watch api")
        }

        //throw error;   //You can also throw the error to a global error handler
      }
    )
    console.log("called it yeet");
    console.log("response data", this._allLocations);
    console.log("response error", this.allLocations);

    return this.allLocations;

  }
  public asObservable(subject: any) {
    return new Observable(fn => subject.subscribe(fn));
  }

  public parseXML(xmlString: string) {
    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlString, 'text/xml');
    var obj = this.ngxXml2jsonService.xmlToJson(xml);
    return obj;
  }

  public static test() {
    console.log("test function called");
    return "this is the returened data from test";
  }

}


