import {EventEmitter, Injectable} from '@angular/core';
import { Recipe } from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()
  private recipes: Recipe[] = [
    new Recipe(
      "Meatballs",
      "Awesome meatballs",
      "https://toriavey.com/images/2011/01/TOA109_18-1-500x500.jpeg",
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potatoes', 5)
      ]
    ),
    new Recipe(
      "Salad",
      "Healthy salad",
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
      [
        new Ingredient('Salad', 1),
        new Ingredient('Tomatoes', 5),
      ]
    )
  ]

  constructor() { }

  getRecipes(): Recipe[]
  {
    return this.recipes.slice()
  }
}
