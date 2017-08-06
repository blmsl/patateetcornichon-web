import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'pec-who-are-us',
  templateUrl: './who-are-us.component.html',
  styleUrls: ['./who-are-us.component.scss']
})
export class WhoAreUsComponent implements OnInit {

  constructor(private _titleService: Title) { }

  ngOnInit() {
    this._titleService.setTitle('Qui sommes-nous ? | Patate & Cornichon');
  }

}
