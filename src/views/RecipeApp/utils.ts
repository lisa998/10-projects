import { Ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from './interface';

const Url = (str: string) => `https://www.themealdb.com/api/json/v1/1/${str}`;

export function checkDomHeight(dom: Ref<null | HTMLElement>): boolean {
  if (dom.value) {
    return dom.value.scrollHeight > 320;
  }
  return false;
}

interface Response {
  meals: Array<Recipe>;
}

export async function getRandomRecipe(): Promise<Recipe> {
  const result: AxiosResponse<Response> = await axios(Url('random.php'));
  return result.data.meals[0];
}
export async function searchRecipe(str: string): Promise<Recipe[]> {
  const result: AxiosResponse<Response> = await axios(Url(`search.php?s=${str}`));
  return result.data.meals;
}
export async function RecipeInsert(data: Recipe[]): Promise<Recipe[]> {
  return data.map((ele) => {
    const ingredient = [];
    const measure = [];
    for (let i = 1; i <= 20; i += 1) {
      const ing = `strIngredient${i}`;
      const m = `strMeasure${i}`;
      if (ele[ing]) {
        ingredient.push(ele[ing]);
      }
      if (ele[m]) {
        measure.push(ele[m]);
      }
    }
    return {
      idMeal: ele.idMeal,
      strMeal: ele.strMeal,
      strCategory: ele.strCategory,
      strArea: ele.strArea,
      strTags: ele.strTags,
      strMealThumb: ele.strMealThumb,
      strInstructions: ele.strInstructions,
      strIngredient: ingredient,
      strMeasure: measure,
    };
  });
}
