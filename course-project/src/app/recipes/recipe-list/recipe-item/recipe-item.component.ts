import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model.js';
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe
  @Input() recipeId: number
}
