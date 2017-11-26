/**
 * Angular Imports
 */
import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

/**
 * Routes
 */
import {ROUTES} from './app.routes';

/**
 * Services
 */
import {UtilsService} from './services/utils.service';
import {RecipesService} from './services/recipes.service';
import {SocialService} from "./services/social.service";

/**
 * Pipes
 */
import {SafePipe} from './pipes/safe.pipe';
import {CloudinaryPipe} from './pipes/cloudinary.pipe';
import {MomentPipe} from "./pipes/moment.pipe";
import {RecipeUrlPipe} from "./pipes/recipeUrl.pipe";
import {SmileyPipe} from "./pipes/smiley.pipe";
import {MinutesToHoursPipe} from "./pipes/minutesToHours.pipe";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {EscapePipe} from "./pipes/escape.pipe";
import {DifficultyPipe} from "./pipes/difficulty.pipe";

/**
 * Components
 */
import {AppComponent} from './app.component';
import {
  RecipesComponent, RecipesCategoriesComponent,
  RecipesListComponent
} from './components/recipes/recipes.component';
import {HomeComponent} from './components/home/home.component';
import {NavComponent} from './components/layout/header/nav/nav.component';
import {SearchBarComponent} from './components/home/search-bar/search-bar.component';
import {QuotationComponent, QuotationService} from './components/home/search-bar/quotation.component';
import {QuickLinksComponent} from './components/home/home-content/quick-links/quick-links.component';
import {HomeContentComponent} from './components/home/home-content/home-content.component';
import {SlidesComponent} from './components/home/home-content/slides/slides.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {RecipeDetailsComponent} from './components/recipes/recipe-details/recipe-details.component';
import {CommentsComponent, CommentItemComponent} from './components/recipes/recipe-details/comments/comments.component';
import {RelativeRecipesComponent} from './components/recipes/recipe-details/relative-recipes/relative-recipes.component';
import {NotFoundComponent} from './components/extra/not-found/not-found.component';
import {SearchResultsComponent} from './components/extra/search-results/search-results.component';
import {WhoAreUsComponent} from './components/extra/who-are-us/who-are-us.component';
import {ContactFormComponent} from './components/extra/who-are-us/contact-form/contact-form.component';
import {LegalNoticeComponent} from './components/extra/legal-notice/legal-notice.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {SoonComponent} from './components/extra/soon/soon.component';
import {NewsletterComponent} from './components/home/home-content/quick-links/newsletter/newsletter.component';

@NgModule({
  declarations: [
    SafePipe,
    CloudinaryPipe,
    MomentPipe,
    RecipeUrlPipe,
    SmileyPipe,
    MinutesToHoursPipe,
    TruncatePipe,
    EscapePipe,
    DifficultyPipe,

    AppComponent,
    RecipesComponent,
    RecipesCategoriesComponent,
    RecipesListComponent,
    HomeComponent,
    NavComponent,
    SearchBarComponent,
    QuickLinksComponent,
    HomeContentComponent,
    SlidesComponent,
    FooterComponent,
    RecipeDetailsComponent,
    CommentsComponent,
    CommentItemComponent,
    RelativeRecipesComponent,
    NotFoundComponent,
    SearchResultsComponent,
    WhoAreUsComponent,
    ContactFormComponent,
    LegalNoticeComponent,
    QuotationComponent,
    HeaderComponent,
    SoonComponent,
    NewsletterComponent
  ],
  entryComponents: [SoonComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'web-pec'
    }),
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    Title,
    UtilsService,
    RecipesService,
    SocialService,
    QuotationService
  ],
  bootstrap: [AppComponent]
})
export class AppCommonModule {
}
