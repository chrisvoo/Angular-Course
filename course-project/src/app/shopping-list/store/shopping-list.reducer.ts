import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";
import {addIngredient, addIngredients, deleteIngredient, updateIngredient} from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export const shoppingListReducerReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => (
    {
      ...state,
      ingredients: [...state.ingredients, action.value]
    }
  )),
  on(addIngredients, (state, action) => (
    {
      ...state,
      ingredients: [...state.ingredients, ...action.value]
    }
  )),
  on(updateIngredient, (state, action) => {
    const { index } = action
    const ingredient = state.ingredients[index]
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient
    }
    const updatedIngredients = [...state.ingredients]
    updatedIngredients[index] = updatedIngredient

    return {
      ...state,
      ingredients: updatedIngredients
    }
  }),
  on(deleteIngredient, (state, action) => {

    return {
      ...state,
      ingredients: state.ingredients.filter((ingredient, index) => {
        return index !== action.value
      })
    }
  })
);
