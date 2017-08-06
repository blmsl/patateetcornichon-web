import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Recipe} from "../../../interfaces/recipe.interface";
import {RecipesService} from "../../../services/recipes.service";
import {FormControl} from "@angular/forms";
import {SearchBarAnimations} from "./search-bar.animations";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils.service";

@Component({
  selector: 'pec-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: SearchBarAnimations
})
export class SearchBarComponent implements OnInit {

  searchInput: FormControl = new FormControl();
  recipes: Recipe[]= [];
  display: string = 'hidden';

  constructor(private utilsService: UtilsService,
              private router: Router,
              private recipesService: RecipesService) {
  }

  ngOnInit(): void {

    /**
     * On Search Input Value Changes
     * Return a query if input length >= 2
     */
    this.searchInput.valueChanges
      .filter(query => {
        if (query && query.length >= 2) return true;
        else {
          this.display = 'hidden';
          this.recipes = null;
          return false
        }
      })
      .distinctUntilChanged()
      .switchMap(value => this.recipesService.searchRecipe(value))
      .subscribe(recipes => {
        this.display = 'visible';
        this.recipes = recipes;
      });
  }

  /**
   * If the User press Enter, a search Recipes is invoked
   * @param event
   */
  onKeyboardEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') this.searchRecipes();
  }

  /**
   * Go to Search Results Page if there is a query
   */
  searchRecipes() {
    const value = this.searchInput.value;
    if (value) {
      this.router.navigate(['/rechercher', {q: value}]);
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }
    else this.utilsService.snackBar('error', 'C\'est mieux de remplir le champs :-)')
  }

}
