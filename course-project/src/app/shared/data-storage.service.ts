import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes()
    return this.http
      .put(`${environment.API_URL}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response)
      })
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${environment.API_URL}/recipes.json`)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
  }
}
