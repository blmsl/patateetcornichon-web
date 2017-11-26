import {Component, OnInit, Input, Inject, HostListener, ViewChild, ElementRef} from '@angular/core';
import {UtilsService} from "../../../services/utils.service";
import {DOCUMENT} from "@angular/common";
import {Category} from "../../../interfaces/category.interface";
import {FormControl} from "@angular/forms";
import {Recipe} from "../../../interfaces/recipe.interface";
import {RecipesService} from "../../../services/recipes.service";
import {SearchBarAnimations} from "../../home/search-bar/search-bar.animations";
import {Router} from "@angular/router";
import {RecipeUrlPipe} from "../../../pipes/recipeUrl.pipe";
import {Social} from "../../../interfaces/social.interface";
import {PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {CONFIG} from "../../../app.config";

@Component({
  selector: 'pec-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: SearchBarAnimations,
  providers: [RecipeUrlPipe]
})
export class HeaderComponent implements OnInit {
  @Input() socialUrls: Social;
  @Input() categories: Category[];
  @Input() currentRoute: string;

  @ViewChild('search') search: ElementRef;

  searchInput: FormControl = new FormControl();
  recipes: Recipe[];
  defaultLogo: string;
  navIsFixed: boolean = false;
  toTopButtonDisplay: number = 0;
  display: string = 'hidden';
  navState: string = 'hidden';

  constructor(private _router: Router,
              private _recipeUrlPipe: RecipeUrlPipe,
              private _recipesService: RecipesService,
              private _utilsService: UtilsService,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(DOCUMENT) private _document: any) {
  }

  ngOnInit() {

    /**
     * Get the default logo from CDN
     * @type {string}
     */
    this.defaultLogo = CONFIG.CDNRoot + '/assets/patate-et-cornichon-logo.svg';

    /**
     * Search Input
     */
    this.searchInput.valueChanges
      .filter(query => {
        if (query && query.length >= 2 && this.currentRoute !== '/rechercher') return true;
        else {
          this.display = 'hidden';
          this.recipes = null;
          return false
        }
      })
      .distinctUntilChanged()
      .switchMap(value => this._recipesService.searchRecipe(value, 0, 3))
      .subscribe(recipes => {
        this.display = 'visible';
        this.recipes = recipes;
      });
  }

  /**
   * Reset Search Input
   */
  goToRecipe(selectedRecipe: Recipe) {
    this._router.navigate(this._recipeUrlPipe.transform(selectedRecipe));
    this.searchInput.reset();
  }

  /**
   * If the user press Enter
   */
  onKeyboardEvent(event: KeyboardEvent) {
    const value = this.searchInput.value;
    if (this.currentRoute !== '/rechercher' && (event.key === 'Enter')) {
      this.searchRecipes(value);
      this.searchInput.reset();
      this.search.nativeElement.blur();
      if (isPlatformBrowser(PLATFORM_ID)) window.scrollTo(0, 0);
    }
    else if (this.currentRoute === '/rechercher' && value.length) this.searchRecipes(value);
  }

  /**
   * Search Recipe
   * @param value
   */
  searchRecipes(value: string) {
    if (value) this._router.navigate(['/rechercher', {q: value}]);
    else this._utilsService.snackBar('error', 'C\'est mieux de remplir le champs :-)')
  }

  /**
   * Change the nav position when the user scroll the page
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = this._document.documentElement.scrollTop || this._document.body.scrollTop;
    if (scrollPosition > 400) {
      this.navIsFixed = true;
      this.toTopButtonDisplay = 1;
    } else if (this.navIsFixed && scrollPosition < 285) {
      this.navIsFixed = false;
      this.toTopButtonDisplay = 0;
    }
  }

  /**
   * On Scroll To Top Button Link
   */
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  changeNavState(state: string) {
    this.navState = state;
    if (state === 'visible') this._document.body.classList.add('mobile-navigation');
    else if (state === 'hidden') this._document.body.classList.remove('mobile-navigation');
  }

}
