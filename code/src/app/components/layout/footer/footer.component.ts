import {Component, OnInit, Input} from '@angular/core';
import {Category} from "../../../interfaces/category.interface";
import {InstaMedia} from "../../../interfaces/instaMedia.interface";
import {RecipesService} from "../../../services/recipes.service";
import {Social} from "../../../interfaces/social.interface";

@Component({
  selector: 'pec-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number;
  favoriteComments: any;

  @Input() instagramMedias: InstaMedia[];
  @Input() categories: Category[];
  @Input() socialUrls: Social;

  constructor(private _recipesService: RecipesService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.favoriteComments = this._recipesService.getFavoriteComments();
  }

}
