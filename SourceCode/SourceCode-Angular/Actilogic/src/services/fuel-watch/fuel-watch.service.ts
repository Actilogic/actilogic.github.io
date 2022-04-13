import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import * as xml2js from 'xml2js';
import * as RSSParser from 'rss-parser';

@Injectable({
  providedIn: 'root'
})

export class FuelWatchService {
  [x: string]: any;

  // url to the fuel watch rss
  private apiurl: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";
  static get: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  /** GET fuelwatch data from the server */
  public get(): any {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    var responseData;

    this.http.get<any>(CORS_PROXY + this.apiurl).subscribe(data => {
      responseData = data
      console.log("responseDatar", responseData);
    })

    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.

    // let parser = new RSSParser();
    // parser.parseURL(CORS_PROXY + this.apiurl, function (err, feed) {
    //   alert("parsing response");
    //   console.log("feed", feed);
    //   feed.items.forEach(function (item) {
    //     console.log(item);
    //   })
    // })


    // const requestOptions: Object = {
    //   observe: 'body',
    //   responseType: 'text'
    // };

    // this.http
    //   .get<any>(
    //     this.apiurl,
    //     requestOptions
    //   )
    //   .subscribe((data) => {
    //     let parseString = xml2js.parseString;
    //     parseString(data, (result: any) => {
    //       console.log(result);
    //     });
    //   });

  }

  public static test() {
    console.log("test function called");
    return "this is the returened data from test";
  }

}


