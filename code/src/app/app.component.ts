import {Component, OnInit, Inject, AfterContentChecked} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Category} from './interfaces/category.interface';
import {SocialService} from './services/social.service';
import {InstaMedia} from './interfaces/instaMedia.interface';
import {Observable} from 'rxjs/Observable';
import {RecipesService} from './services/recipes.service';
import 'rxjs/add/operator/filter';
import {LocationStrategy} from '@angular/common';
import {PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {backgrounds} from './app.backgrounds';
import {QuotationService} from './components/home/search-bar/quotation.component';

declare const ga: Function;

@Component({
  selector: 'pec-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentChecked {

  currentRoute: string;
  homeBackgroundAndQuotation: any;
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
              private quotationService: QuotationService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.homeBackgroundAndQuotation = backgrounds.homepage;
      this.homeBackground = this.homeBackgroundAndQuotation.url;
      this.allBackground = backgrounds.all;
    }


    /**
     * Get Categories
     * @type {Subscription}
     */
    this.getCategories = this.recipesService.getCategories()
      .subscribe(categories => this.categories = categories);

    /**
     * Get Instagram Medias
     * @type Observable<InstaMedia[]>
     */
    if (isPlatformBrowser(this.platformId)) {
      this.instagramMedia = this.socialService.getInstagramMedias(9);
    }

    /**
     * Get Social Links
     * @type {Socials}
     */
    this.socialUrls = this.socialService.getSocialUrls();

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

  ngAfterContentChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.quotationService.setQuotation(this.homeBackgroundAndQuotation.quotation);
    }
  }
}
