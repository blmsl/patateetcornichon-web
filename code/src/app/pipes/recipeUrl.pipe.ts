import {Pipe} from '@angular/core';
import {Recipe} from "../interfaces/recipe.interface";

@Pipe({
  name: 'recipeUrl'
})
export class RecipeUrlPipe {

  constructor() {}

  public transform(recipe: Recipe): Array<string> {
    return ['/recettes/', recipe.slug]
  }

}
