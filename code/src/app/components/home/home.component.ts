import {Component, OnInit} from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'pec-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title,
              private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle('Patate & Cornichon | Recettes vegan, simples et rapides !');
    this.meta.updateTag({
      name: 'description',
      content: 'Le site de recettes vegans pour les grosses feignasses.'
    })
  }

}
