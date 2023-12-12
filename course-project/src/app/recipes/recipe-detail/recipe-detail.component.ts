import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model.js';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe

  constructor(private shoppingListService: ShoppingListService) {  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients)
  }
}
