import { Component, OnInit } from '@angular/core';
import { FuelWatchService } from '../../services/fuel-watch/fuel-watch.service';
import { environment } from 'src/environments/environment';
import { FuelWatchFeed } from 'src/models/fuelwatchfeed.model';

@Component({
  selector: 'app-fuel-saver',
  templateUrl: './fuel-saver.component.html',
  styleUrls: ['./fuel-saver.component.scss']
})
export class FuelSaverComponent implements OnInit {

  public environment = environment;
  public FuelWatchFeedList: FuelWatchFeed[] | null = null;


  constructor(
    private FuelWatch: FuelWatchService,
    private FuelWatchService: FuelWatchService,
  ) { }

  ngOnInit(): void {
  }

  loadData() {
    console.log("loading data");
    console.log(FuelWatchService.test());
    console.log("calling the api to load data");
    // var idkanymore:any = this.FuelWatchService.get();
    this.FuelWatchService.get().subscribe(
      success => { console.log("this is what i want",success); },
      error => {
        console.log(
          "calling the api has failed in the component"
        );
      }
    );
  }

}
