import { Injectable } from '@angular/core';
import { CONFIG } from '../app.config';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Recipe} from "../interfaces/recipe.interface";
import {Comment} from "../interfaces/comment.interface";
import {Category} from "../interfaces/category.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get recipes of the selection
   * @returns Observable<Recipe[]>
   */
  public getSelection(): Observable<any> {
    return this.http.get(`${CONFIG.apiRoot}/junk-food/recipes/selection`);
  }

  /**
   * Get last recipes
   * @param limit
   * @param offset
   * @returns {Observable<Recipe[]>}
   */
  public getLastRecipes(limit: number = 7, offset: number = 0): Observable<Recipe[]> {
    return this.http.get(
      `${CONFIG.apiRoot}/junk-food/recipes?limit=${limit}&offset=${offset}`);
  }

  /**
   * Get recipes ordered by popularity
   * @param limit
   * @param offset
   * @returns {Observable<Recipe[]>}
   */
  public getPopularRecipes(limit: number = 7, offset: number = 0): Observable<Recipe[]> {
    return this.http.get(`${CONFIG.apiRoot}/junk-food/recipes/?order=-views&offset=${offset}&limit=${limit}`);
  }

  /**
   * Get recipes of a specific category with an optional limit
   * @param slug
   * @param random
   * @param offset
   * @param limit
   * @returns Observable<Recipe[]>
   */
  public getRecipesByCategory(slug: string, random=false, offset: number = 0, limit?:number): Observable<Recipe[]> {
    return this.http.get(
      `${CONFIG.apiRoot}/junk-food/recipes?category=${slug}&random=${random}&offset=${offset}${limit ? ('&limit=' + limit) : null}`
    );
  }

  /**
   * Get one recipe thanks to a slug
   * @param slug
   * @returns Observable<Recipe>
   */
  public getRecipe(slug: string): Observable<Recipe> {
    return this.http.get(
      `${CONFIG.apiRoot}/junk-food/recipes/${slug}`);
  }

  /**
   * Search a recipe with a value
   * @param value
   * @param offset
   * @param limit
   * @returns Observable<Recipe[]>
   */
  public searchRecipe(value: string = '', offset: number = 0, limit: number = 5): Observable<Recipe[]> {
    let lowercase = value.toLowerCase();

    return this.http.get(
      `${CONFIG.apiRoot}/junk-food/recipes/?s=${lowercase}&order=-created_at&limit=${limit}&offset=${offset}`
    );
  }

  /**
   * Add a comment and return it
   * @param comment
   * @returns Observable<Comment>
   */
  public addComment(comment: Comment): Observable<Comment> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${CONFIG.apiRoot}/junk-food/comments/`, comment, { headers: headers });
  }

  public addView(slug: string): Observable<number> {
    return this.http.post(`${CONFIG.apiRoot}/junk-food/recipes/${slug}/add-view/`, null);
  }

  /**
   * Get Favorite Comments
   * @returns Observable<Comment[]>
   */
  public getFavoriteComments(): Observable<Comment[]> {
    return this.http.get(`${CONFIG.apiRoot}/junk-food/comments?favorite=true&limit=3`);
  }

  /**
   * Get relative recipes thanks to tags Array
   * @param slug
   * @param limit
   * @returns Observable<Recipe[]>
   */
  public getRelativeRecipes(slug: string, limit: number = 3): Observable<Recipe[]> {
    return this.http.get(`${CONFIG.apiRoot}/junk-food/recipes/${slug}/relative?limit=${limit}`);
  }

  /**
   * Get all the categories
   * @returns Observable<Category[]>
   */
  public getCategories(): Observable<Category[]> {
    return this.http.get(
      `${CONFIG.apiRoot}/junk-food/categories`
    );
  }


}
