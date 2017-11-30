import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeDetailsComponent} from './components/recipes/recipe-details/recipe-details.component';
import {NotFoundComponent} from './components/extra/not-found/not-found.component';
import {SearchResultsComponent} from './components/extra/search-results/search-results.component';
import {WhoAreUsComponent} from './components/extra/who-are-us/who-are-us.component';
import {LegalNoticeComponent} from './components/extra/legal-notice/legal-notice.component';
import {ContactComponent} from './components/extra/contact/contact.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recettes', component: RecipesComponent},
  {path: 'recettes/categories/:category', component: RecipesComponent},
  {path: 'recettes/categories/:category/:subcategory', component: RecipesComponent},
  {path: 'recettes/:title', component: RecipeDetailsComponent},
  {path: 'rechercher', component: SearchResultsComponent},
  {path: 'qui-sommes-nous', component: WhoAreUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'mentions-legales', component: LegalNoticeComponent},
  {path: 'page-introuvable', component: NotFoundComponent},
  {path: '**', redirectTo: '/page-introuvable'}
];
