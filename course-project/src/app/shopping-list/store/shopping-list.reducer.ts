import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient
} from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

// never pass references to objects, always pass new objects
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
    const ingredient = state.ingredients[state.editedIngredientIndex]
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient
    }
    const updatedIngredients = [...state.ingredients]
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  }),
  on(deleteIngredient, (state, action) => {

    return {
      ...state,
      ingredients: state.ingredients.filter((ingredient, index) => {
        return index !== state.editedIngredientIndex
      }),
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: {...state.ingredients[action.index]}
    }
  }),
  on(stopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  })
);
