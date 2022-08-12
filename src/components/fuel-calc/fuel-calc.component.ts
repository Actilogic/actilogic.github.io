import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fuel-calc',
  templateUrl: './fuel-calc.component.html',
  styleUrls: ['./fuel-calc.component.scss']
})
export class FuelCalcComponent implements OnInit, OnChanges {

  @Input() FuelCalc_price: number;
  @Input() FuelCalc_distance: number;
  FuelCalc_fuelEfficiency: number;
  FuelCalc_cost: number = 0;

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
    console.log("new onchange", this.ngOnChanges);
    console.log("new change", changes);
    this.calcCost();

    for (let property in changes) {
      if (property === 'FuelCalc_price') {
        console.log('Previous FuelCalc_price:', changes[property].previousValue);
        console.log('Current FuelCalc_price:', changes[property].currentValue);
        console.log('firstChange FuelCalc_price:', changes[property].firstChange);
        this.FuelCalc_price = changes[property].currentValue;
      }
      if (property === 'FuelCalc_distance') {
        console.log('Previous FuelCalc_distance:', changes[property].previousValue);
        console.log('Current FuelCalc_distance:', changes[property].currentValue);
        console.log('firstChange FuelCalc_distance:', changes[property].firstChange);
        this.FuelCalc_distance = changes[property].currentValue;
      }
      // if (property === 'FuelCalc_fuelEfficiency') {
      //   console.log('Previous FuelCalc_fuelEfficiency:', changes[property].previousValue);
      //   console.log('Current FuelCalc_fuelEfficiency:', changes[property].currentValue);
      //   console.log('firstChange FuelCalc_fuelEfficiency:', changes[property].firstChange);
      //   this.FuelCalc_fuelEfficiency = changes[property].currentValue;
      // }
    }
  }

  public calcCost() {
    // 50 km journy
    // 5l / 100km
    // 1l goes 20km
    // 1km takes 0.05l
    // therefore calculate cost go litre / 100km
    console.log("changing the cost");
    var litrePerKM = this.FuelCalc_fuelEfficiency / 100.00;
    var litrePerMetre = litrePerKM / 1000;
    var litreForTrip = this.FuelCalc_distance * litrePerMetre;
    var litreDollarPrice = this.FuelCalc_price / 100;
    var calculatedCost = litreForTrip * litreDollarPrice;

    console.log("litrePerKM", litrePerKM);
    console.log("litrePerKM", litrePerKM);
    console.log("litrePerMetre", litrePerMetre);
    console.log("litreForTrip", litreForTrip);
    console.log("calculatedCost", calculatedCost);
    console.log("new cost", calculatedCost);
    this.setCost(calculatedCost);
  }

  setFuelEfficiency(newFuelEfficiency) {
    console.log("newFuelEfficiency", newFuelEfficiency);
    this.FuelCalc_fuelEfficiency = newFuelEfficiency;
    this.calcCost();
  }

  setCost(newCost) {
    this.FuelCalc_cost = newCost;
  }


}  
