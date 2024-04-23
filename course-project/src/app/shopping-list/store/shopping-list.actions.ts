import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const addIngredient = createAction(
  '[ShoppingList] Add ingredient',
  props<{value: Ingredient}>(),
);

export const addIngredients = createAction(
  '[ShoppingList] Add ingredients',
  props<{value: Ingredient[]}>(),
);

export const deleteIngredient = createAction(
  '[ShoppingList] Delete ingredient',
  props<{value: number}>(),
);

export const updateIngredient = createAction(
  '[ShoppingList] Update ingredient',
  props<{index: number, ingredient: Ingredient}>(),
);
