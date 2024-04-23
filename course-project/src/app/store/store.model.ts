import {Ingredient} from "../shared/ingredient.model";

export type AppStore = {
  shoppingList: {
    ingredients: Ingredient[],
    editedIngredient: Ingredient | null,
    editedIngredientIndex: number
  }
}
