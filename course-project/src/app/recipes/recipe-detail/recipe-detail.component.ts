import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model.js';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
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
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {  }

  toShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.router.navigate(['/shopping-list'])
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute })
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/'], { relativeTo: this.activeRoute })
  }

  onDeleteIngredient() {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }
}
