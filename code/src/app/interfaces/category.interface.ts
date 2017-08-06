export interface Category {
  name: string,
  slug: string,
  id: string,
  css_class?: string
  subcategories: Category[]
}
