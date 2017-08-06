import {Component, OnInit, Input} from '@angular/core';
import {Recipe} from "../../../../interfaces/recipe.interface";
import {RecipesService} from "../../../../services/recipes.service";
import {Observable} from "rxjs";

@Component({
  selector: 'pec-relative-recipes',
  templateUrl: './relative-recipes.component.html',
  styleUrls: ['./relative-recipes.component.scss']
})
export class RelativeRecipesComponent implements OnInit {
  @Input() recipeSlug: string;
  recipes: Observable<Recipe[]>;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRelativeRecipes(this.recipeSlug, 3);
  }

}
