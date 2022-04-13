import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  a = 123;
  public environment = environment;
  public year = new Date().getFullYear()


  constructor() { }

  ngOnInit(): void {
  }

}
