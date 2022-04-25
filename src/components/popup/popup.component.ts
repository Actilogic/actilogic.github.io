import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  title: string = "this is the title of the popup";



  constructor(
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  test() { alert("popupComponent works") }


  toHTML() { }
}

