import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fuel-calc',
  templateUrl: './fuel-calc.component.html',
  styleUrls: ['./fuel-calc.component.scss']
})
export class FuelCalcComponent implements OnInit, OnChanges {

  fuelEfficiency: number = 0;

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
    alert("new efficiency" + this.fuelEfficiency);

    for (let property in changes) {
      if (property === 'feed') {
        //   console.log('Previous:', changes[property].previousValue);
        //   console.log('Current:', changes[property].currentValue);
        //   console.log('firstChange:', changes[property].firstChange);
        this.fuelEfficiency = changes[property].currentValue;
      }
    }
  }


}
