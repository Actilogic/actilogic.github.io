import { Component, OnInit } from '@angular/core';
import { FuelWatchService } from '../../services/fuel-watch/fuel-watch.service';

@Component({
  selector: 'app-fuel-saver',
  templateUrl: './fuel-saver.component.html',
  styleUrls: ['./fuel-saver.component.scss']
})
export class FuelSaverComponent implements OnInit {

  constructor(private FuelWatch: FuelWatchService) { }

  ngOnInit(): void {
  }

  loadData() {
    console.log("loading data");
    FuelWatchService.test();
  }

}
