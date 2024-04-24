import {Ingredient} from "../shared/ingredient.model";
import {authReducer, AuthState} from "../auth/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {shoppingListReducerReducer} from "../shopping-list/store/shopping-list.reducer";

export type AppStore = {
  shoppingList: {
    ingredients: Ingredient[],
    editedIngredient: Ingredient | null,
    editedIngredientIndex: number
  },
  auth: AuthState
}

export const appReducers: ActionReducerMap<AppStore> = {
  shoppingList: shoppingListReducerReducer,
  auth: authReducer
}
