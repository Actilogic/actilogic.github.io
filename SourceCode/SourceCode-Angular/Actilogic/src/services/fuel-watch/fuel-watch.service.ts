import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuelWatchService {

  // url to the fuel watch rss
  private apiurl: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a FuelWatch message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

  // public getHeroes(): Observable<Hero[]> {
  //   // const heroes = of(HEROES);
  //   // return heroes;
  //   return 1
  // }

  public static test() {
    alert("fuel watch api called");
    return "this is the returened data";
  }


}
