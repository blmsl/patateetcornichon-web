import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'pec-legal-notice',
  templateUrl: './legal-notice.component.html',
  styles: ['.main h1.main-title { margin-bottom: 60px } h2  { margin-top: 40px }']
})
export class LegalNoticeComponent implements OnInit {

  constructor(private _titleService: Title) { }

  ngOnInit() {
    this._titleService.setTitle('Mentions légales | Patate & Cornichon');
  }

}
