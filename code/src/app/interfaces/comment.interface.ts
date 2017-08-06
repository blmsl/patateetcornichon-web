export interface Comment {
  id?: string,
  author: string,
  author_email: string,
  author_avatar?: string,
  author_url?: string,
  notifications: boolean,
  recipe: number,
  recipe_informations?: {
    full_title: string,
    slug: string
  }
  created_at?: string,
  content: string,
  parent: number
  sub_comments?: Comment[]
}
