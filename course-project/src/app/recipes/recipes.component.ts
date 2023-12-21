import {Component, OnInit} from '@angular/core';
import { Recipe } from './recipe.model.js';
import {RecipeService} from "./recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  ngOnInit(): void {}

}
