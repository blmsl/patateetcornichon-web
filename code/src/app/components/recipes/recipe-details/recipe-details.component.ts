import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../../interfaces/recipe.interface";
import {RecipesService} from "../../../services/recipes.service";
import 'rxjs/add/operator/publishReplay';
import {Subscription} from "rxjs";
import {Title, Meta} from "@angular/platform-browser";
import {SocialService} from "../../../services/social.service";
import {UtilsService} from "../../../services/utils.service";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'pec-recipe-details-container',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  currentURL: string;

  private getRecipe: Subscription;

  constructor(
    private social: SocialService,
    private meta: Meta,
    private socialService: SocialService,
    private titleService: Title,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentURL = typeof window !== 'undefined' ? window.location.href : '';
      this.getRecipe = this.recipesService.getRecipe(params['title'])
        .subscribe(
          recipe => {
            this.recipe = recipe;

            /**
             * Add a view
             */
            this.addView(recipe.slug);

            /**
             * Set Meta tags
             */
            this.titleService.setTitle(recipe.full_title);
            this.meta.updateTag({ name: 'description', content: recipe.meta_description });
            this.meta.addTags([

              // Open Graph
              { property: 'og:title', content: recipe.full_title },
              { property: 'og:description', content: recipe.meta_description },
              { property: 'og:image', content: recipe.main_image.medium_size },
              { property: 'og:type', content: 'article' },
              { property: 'article:author', content: this.socialService.getSocialUrls().facebook },
              { property: 'article:publisher', content: this.socialService.getSocialUrls().facebook },

              // Twitter
              { property: 'twitter:description', content: recipe.meta_description },
              { property: 'twitter:title', content: recipe.full_title },
              { property: 'twitter:image', content: recipe.main_image.medium_size },
              { property: 'twitter:site', content: '@PeC_cooking' },
              { property: 'twitter:creator', content: '@PeC_cooking' }
            ]);
          },
          err => this.utilsService.redirectIf404()
        );
    });
  }

  addView(slug: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.recipesService.addView(slug).subscribe();
    }
  }

  openSocial(social: string): void {
    this.social.shareOn(social, this.currentURL);
  }

  ngOnDestroy(): void {
    this.getRecipe.unsubscribe();
  }

}
