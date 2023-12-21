import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model.js';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe
  id: number

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute
  ) {  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients)
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }
}
