import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fuel-calc',
  templateUrl: './fuel-calc.component.html',
  styleUrls: ['./fuel-calc.component.scss']
})
export class FuelCalcComponent implements OnInit, OnChanges {

  @Input() FuelCalc_fuelEfficiency: number;
  @Input() FuelCalc_distance: number;

  constructor() { }

  ngOnInit(): void {
    /* Set the width of the sidebar to 250px (show it) */
    document.getElementById("openbtn").addEventListener("click", function () {
      document.getElementById("mySidepanel").style.width = "250px";
    })

    /* Set the width of the sidebar to 0 (hide it) */
    document.getElementById("closebtn").addEventListener("click", function () {
      document.getElementById("mySidepanel").style.width = "0";
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // alert("new efficiency" + this.FuelCalc_fuelEfficiency);
    // alert("new distance" + this.FuelCalc_distance);

    for (let property in changes) {
      if (property === 'feed') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.FuelCalc_fuelEfficiency = changes[property].currentValue;
      }
      if (property === 'fuelEfficiency') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.FuelCalc_fuelEfficiency = changes[property].currentValue;
      }
      if (property === 'distance') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.FuelCalc_distance = changes[property].currentValue;
      }
    }
  }


}
