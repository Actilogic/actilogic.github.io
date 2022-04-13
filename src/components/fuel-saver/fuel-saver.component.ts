import { Component, OnInit } from '@angular/core';
import { FuelWatchService } from '../../services/fuel-watch/fuel-watch.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fuel-saver',
  templateUrl: './fuel-saver.component.html',
  styleUrls: ['./fuel-saver.component.scss']
})
export class FuelSaverComponent implements OnInit {

  public environment = environment;


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
    this.FuelWatchService.get();
  }

}
