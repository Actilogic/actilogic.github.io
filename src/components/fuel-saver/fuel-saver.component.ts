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
  public FuelWatchFeedList: FuelWatchFeed | null = null;


  constructor(
    private FuelWatch: FuelWatchService,
    private FuelWatchService: FuelWatchService,
  ) { }

  ngOnInit(): void {
  }

  loadData() {
    this.FuelWatchService.get().subscribe({
      next: albums => {
        console.log("this is htere1", this.FuelWatchFeedList);
        console.log("this is alnus", albums);
        this.FuelWatchFeedList = <FuelWatchFeed><unknown>albums;
        console.log("this is htere2", this.FuelWatchFeedList);
      }
    })
    console.log("this is htere2", this.FuelWatchFeedList);
    // .subscribe(
    //   success => { console.log("this is what i want, success in loading component", success); },
    //   error => {
    //     if (!environment.production) {
    //       console.log(" failed in the component but because its run locaally", error);
    //     } else {
    //       console.log("calling the api has failed in the component", error);
    //     }
    //   }
    // );
  }

}
