import {Component, OnInit, Inject} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {Category} from "./interfaces/category.interface";
import {SocialService} from "./services/social.service";
import {InstaMedia} from "./interfaces/instaMedia.interface";
import {Observable} from "rxjs";
import {RecipesService} from "./services/recipes.service";
import 'rxjs/add/operator/filter';
import {LocationStrategy} from "@angular/common";
import {PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

declare const ga: Function;

@Component({
  selector: 'pec-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  currentRoute: string;
  homeBackground: any;
  allBackground: any;
  socialUrls: Object;
  categories: Category[];
  instagramMedia: Observable<InstaMedia[]>;

  private getCategories;
  private getCurrentRoute;


  constructor(private locationStrategy: LocationStrategy,
              private recipesService: RecipesService,
              private socialService: SocialService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {

    /**
     * Get Categories
     * @type {Subscription}
     */
    this.getCategories = this.recipesService.getCategories()
      .subscribe(categories => this.categories = categories);

    /**
     * Get Social Links
     * @type {Socials}
     */
    this.socialUrls = this.socialService.getSocialUrls();

    /**
     * Get Instagram Medias
     * @type Observable<InstaMedia[]>
     */
    if (isPlatformBrowser(this.platformId)) {
      this.instagramMedia = this.socialService.getInstagramMedias(9);
    }

    /**
     * Get Current Route
     * @type {Subscription}
     */
    this.getCurrentRoute = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (isPlatformBrowser(this.platformId)) {
          ga('set', 'page', event.url);
          ga('send', 'pageview');
        }

        this.currentRoute = this.locationStrategy.path().split(';')[0];
        if (this.currentRoute === '/rechercher') return;
        if (isPlatformBrowser(this.platformId)) window.scrollTo(0, 0);
      });
  }
}

