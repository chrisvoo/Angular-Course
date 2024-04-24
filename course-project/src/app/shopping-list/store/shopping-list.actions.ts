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
  '[ShoppingList] Delete ingredient'
);

export const updateIngredient = createAction(
  '[ShoppingList] Update ingredient',
  props<{ingredient: Ingredient}>(),
);

export const startEdit = createAction(
  '[ShoppingList] Start edit',
  props<{index: number}>(),
);

export const stopEdit = createAction(
  '[ShoppingList] Stop edit'
);
