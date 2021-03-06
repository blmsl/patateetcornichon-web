import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pec-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _titleService: Title) {
  }

  ngOnInit() {
    this._titleService.setTitle('Contact | Patate & Cornichon');
  }
}
