import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import {Recipe} from "../../../interfaces/recipe.interface";

@Component({
  selector: 'pec-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit, OnDestroy {

  innerWidth: number;
  selection: any;
  lastRecipes: Recipe[];
  sucreRecipes: Recipe[];
  saleRecipes: Recipe[];
  popularRecipes: Recipe[];

  private getSelection;
  private getLastRecipes;
  private getSweetRecipes;
  private getSaltyRecipes;
  private getPopularRecipes;

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit(): void {

    /**
     * Get InnerWidth
     * @type {number}
     */
    if (typeof window !== 'undefined') this.innerWidth = window.innerWidth;

    /**
     * Selection
     * @type {Subscription}
     */
    this.getSelection = this.recipeService.getSelection()
      .subscribe(res => this.selection = res);

    /**
     * Last Recipes
     * @type {Subscription}
     */
    this.getLastRecipes = this.recipeService.getLastRecipes()
      .subscribe(res => this.lastRecipes = res);

    /**
     * Sweet Recipes
     * @type {Subscription}
     */
    this.getSweetRecipes = this.recipeService.getRecipesByCategory('sucre', true, 0, 7)
      .subscribe(res => this.sucreRecipes = res);

    /**
     * Salty Recipes
     * @type {Subscription}
     */
    this.getSaltyRecipes = this.recipeService.getRecipesByCategory('sale', true, 0, 7)
      .subscribe(res => this.saleRecipes = res);

    /**
     * Popular Recipes
     * @type {Subscription}
     */
    this.getPopularRecipes = this.recipeService.getPopularRecipes()
      .subscribe(res => this.popularRecipes = res);
  }

  /**
   * Change InnerWidth
   */
  @HostListener('window:resize', [])
  changeInnerWidth(): void {
    if (typeof window !== 'undefined') this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      this.getSelection.unsubscribe();
      this.getLastRecipes.unsubscribe();
      this.getSweetRecipes.unsubscribe();
      this.getSaltyRecipes.unsubscribe();
      this.getPopularRecipes.unsubscribe();
    }
  }
}
