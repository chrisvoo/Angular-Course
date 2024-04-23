import {EventEmitter, Injectable} from '@angular/core';
import { Recipe } from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {AppStore} from "../store/store.model";
import {Store} from "@ngrx/store";
import {addIngredients} from "../shopping-list/store/shopping-list.actions";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = []

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService, private store: Store<AppStore>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients)
    this.store.dispatch(addIngredients({value: ingredients}))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.getRecipes())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.getRecipes())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes())
  }
}
