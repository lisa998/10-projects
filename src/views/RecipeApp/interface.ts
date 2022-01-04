export interface Recipe {
  idMeal: number;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strMealThumb: string;
  strInstructions: string;
  stringredient?: string[];
  strMeasure?: string[];
  [key: string]: any;
}
