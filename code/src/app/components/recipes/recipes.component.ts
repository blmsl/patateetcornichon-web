import {
  Component, OnInit, OnDestroy, Input, OnChanges, Output,
  EventEmitter
} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {Category} from "../../interfaces/category.interface";
import {Subscription} from "rxjs";
import {Recipe} from "../../interfaces/recipe.interface";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {Location} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";

/**
 * Recipes Component
 */
@Component({
  selector: 'pec-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  categories: Category[];
  selectedCategory: string;
  selectedSubcategory: string;
  currentCategory: string;

  private getCategories: Subscription;

  constructor(private location: Location,
              private utilsService: UtilsService,
              private recipesService: RecipesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    /**
     * Get Main Categories
     * @type {Subscription}
     */
    this.getCategories = this.recipesService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        err => this.utilsService.redirectIf404()
      );

    /**
     * Get Params with the Route Event
     * Change the current Category
     */
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'];
      this.selectedSubcategory = params['subcategory'];
      this.currentCategory = this.selectedSubcategory ? this.selectedSubcategory : this.selectedCategory;
    });

  }

  /**
   * Change selected Category
   * Change the URL according to the new selected Category
   * @param object
   */
  changeToCategory(object: { category, type }) {

    if (object.type === 'category') {
      if (this.selectedCategory === object.category.slug) {
        this.selectedCategory = null;
        this.selectedSubcategory = null;
        this.currentCategory = null;
        this.location.replaceState(`/recettes`);
      } else {
        this.selectedCategory = object.category.slug;
        this.currentCategory = object.category.slug;
        this.location.replaceState(`/recettes/categories/${this.selectedCategory}`);
      }
    }

    else if (object.type === 'subcategory') {
      if (this.selectedSubcategory === object.category.slug) {
        this.selectedSubcategory = null;
        this.currentCategory = this.selectedCategory;
        this.location.replaceState(`/recettes/categories/${this.selectedCategory}`);
      } else {
        this.selectedSubcategory = object.category.slug;
        this.currentCategory = object.category.slug;
        this.location.replaceState(`/recettes/categories/${this.selectedCategory}/${this.selectedSubcategory}`);
      }
    }

  }

  ngOnDestroy() {
    this.getCategories.unsubscribe();
  }

}

/**
 * Recipes Categories Component
 */
@Component({
  selector: 'pec-recipes-categories',
  templateUrl: './recipes-categories.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesCategoriesComponent implements OnInit {

  @Input() categories: Category[];
  @Input() selectedCategory: string;
  @Input() selectedSubcategory: string;
  @Output() changeToCategory = new EventEmitter<{}>();

  ngOnInit() {
  }

  /**
   * Return subcategory if main category matches with the selected category
   * @param selectedCategory
   * @returns {any}
   */
  getSubcategories(selectedCategory: string): Category | Array<any> {
    for (let category of this.categories) {
      if (category.slug === selectedCategory) return category.subcategories;
    }
    return [];
  }

  /**
   * Change Category Event
   * @param category
   * @param type
   */
  changeCategory(category: Category, type: string) {
    this.changeToCategory.emit({category, type});
  }

}

/**
 * Recipes List Component
 */
@Component({
  selector: 'pec-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() currentCategory: string;
  @Input() categories: Category[];
  @Input() query: string;

  recipes: Recipe[];
  moreRecipes: boolean;
  pending: boolean = false;

  private limit: number = 10;
  private getRecipes: Subscription;
  private skip: number = 0;

  constructor(private titleService: Title,
              private meta: Meta,
              private utilsService: UtilsService,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.skip = 0;
    this.getRecipes = this.getNewRecipes();
  }

  /**
   * Increase the skip parameter and get new recipes
   */
  addMoreRecipes() {
    this.skip += this.limit;
    this.getRecipes = this.getNewRecipes(true);
  }

  /**
   * Get the full Category object according to the sug
   */
  getCategory(currentCategory, categories) {
    for (let category of categories) {
      if (category.slug === currentCategory) return category;
      for (let subcategory of category.subcategories) {
        if (subcategory.slug === currentCategory) return subcategory;
      }
    }
  }

  /**
   * Method to get recipes
   * @param push
   * @returns {Subscription}
   */
  getNewRecipes(push: boolean = false) {

    this.pending = push;

    /**
     * Concat recipe if push and change pending var to false
     * Else we just return recipes
     * @param recipes
     */
    const addRecipes = recipes => {
      if (push) {
        this.recipes = this.recipes.concat(recipes);
        this.pending = false;
      }
      else {
        this.recipes = recipes
      }
    };

    /**
     * If a category is selected
     */
    if (this.currentCategory && this.categories) {

      // Get recipes according to categories
      return this.recipesService.getRecipesByCategory(this.currentCategory, false, this.skip, this.limit)
        .subscribe(recipes => {

            // Set the page title
            const categoryName = this.getCategory(this.currentCategory, this.categories).name;
            this.titleService.setTitle(`${categoryName} | Patate & Cornichon`);
            this.meta.updateTag({
              name: 'description', content:
                `Viens tester nos recettes dans la catégorie ${categoryName} !`
            });

            // Add recipes to the list
            this.moreRecipes = recipes.length === this.limit;
            addRecipes(recipes);
          },
          err => this.utilsService.redirectIf404()
        );
    }

    /**
     * If there is a query search
     */
    else if (this.query) {

      // Set the page title
      this.titleService.setTitle(`Résultats pour "${this.query}" | Patate & Cornichon`);

      // Search query
      return this.recipesService.searchRecipe(this.query, this.skip, this.limit)
        .subscribe(recipes => {
            this.moreRecipes = recipes.length === this.limit;
            addRecipes(recipes)
          }
        )
    }

    /**
     * If there is no category or query in URL
     */
    else {

      // Set the page title
      this.titleService.setTitle('Les recettes | Patate & Cornichon');

      // Get the last recipes
      return this.recipesService.getLastRecipes(this.limit, this.skip)
        .subscribe(recipes => {
            this.moreRecipes = recipes.length === this.limit;
            addRecipes(recipes)
          },
          err => this.utilsService.redirectIf404()
        );
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      if (this.getRecipes) this.getRecipes.unsubscribe();
    }
  }
}
