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
    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    var responseData;
    var errorMessage;

    console.log("calling it yeet");
    this.http.get<any>(CORS_PROXY + this.apiurl).subscribe(
      (response) => {                           //Next callback
        console.log('response received')
        responseData = response;
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        console.log(error.error.text);
        console.log("asdf", this.parseXML(error.error.text));
        //throw error;   //You can also throw the error to a global error handler
      }
    )
    console.log("called it yeet");
    console.log("response", responseData);
    console.log("response error", errorMessage);

  }

  parseXML(data: string) {
    const p: xml2js.Parser = new xml2js.Parser();
    var json = "";
    // p.parseString((responseData: string) => {
    //   json = JSON.stringify(responseData, null, 4); //format your json output
    //   console.log(json);
    // });
    p.parseString(data);

    console.log(json)

  }


  public static test() {
    console.log("test function called");
    return "this is the returened data from test";
  }

}


function data(data: any, arg1: (err: any, result: any) => void) {
  throw new Error('Function not implemented.');
}

