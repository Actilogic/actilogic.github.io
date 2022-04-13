import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var x = document!.getElementById("myTopnav");
    if (x!.className === "topnav") {
      x!.className += " responsive";
    } else {
      x!.className = "topnav";
    }

    console.log("menu loaded");

    // Get the container element
    var btnContainer = document.getElementById("myTopnav");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer!.getElementsByClassName("btn");

    console.log("btns", btns);

    // // Loop through the buttons and add the active class to the current/clicked button
    // for (var i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener("click", (item) => {
    //     var currentPage = document.location.pathname;
    //     console.log(currentPage.split("\\"));

    //     currentPage


    //     // Add the active class to the current/clicked button
    //     btns[i].className += " active";
    //   });
    // }
  }

}
