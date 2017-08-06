import {Category} from './category.interface';
import {Picture} from './picture.interface';

export interface Recipe {
  id: string
  title: string,
  sub_title: string,
  full_title: string,
  introduction: string,
  slug: string,
  created_at: string,
  updated_at: string,
  recipe_yield: string,
  preparation_time: number,
  cooking_time?: number,
  fridge_time?: number,
  leavening_time?: number,
  difficulty: string,
  ingredients: string,
  recipe_steps: string,
  meta_description: string,
  categories: Category[],
  main_image: Picture,
  secondary_image?: Picture,
  comments_nb: number,
  comments: Comment[]
}
