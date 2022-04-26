import { Component, OnInit } from '@angular/core';
import { FuelWatchService } from '../../services/fuel-watch/fuel-watch.service';
import { environment } from 'src/environments/environment';
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-fuel-saver',
  templateUrl: './fuel-saver.component.html',
  styleUrls: ['./fuel-saver.component.scss']
})
export class FuelSaverComponent implements OnInit {

  public environment = environment;
  public FuelWatchFeedList: FuelWatchFeed = null;
  private ngxXml2jsonService: NgxXml2jsonService = new NgxXml2jsonService();
  public Feed: FuelWatchFeed = new FuelWatchFeed({});


  constructor(
    private FuelWatch: FuelWatchService,
    private FuelWatchService: FuelWatchService,
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.FuelWatchService.get().subscribe(
      (success) => {
        var response = success.rss.channel;                      //Next callback
        var parsedXMLResponse: any = this.parseXML<FuelWatchFeed>(response)
        var feedJSON = parsedXMLResponse.rss.channel
        this.Feed = <FuelWatchFeed>feedJSON;
      },
      (error) => {                              //Error callback
        if (!environment.production) {
          var response: string = error.error.text;
          var parsedXMLResponse: any = this.parseXML<FuelWatchFeed>(response)
          var feedJSON = parsedXMLResponse.rss.channel
          this.Feed = feedJSON as FuelWatchFeed;
        } else {
          console.error("Error in loading the fuel watch rss Feed", error);
        }

      }
    )
  }

  public parseXML<T>(xmlString: string): T {
    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlString, 'text/xml');
    var obj = <T>this.ngxXml2jsonService.xmlToJson(xml);
    return obj;
  }

}
