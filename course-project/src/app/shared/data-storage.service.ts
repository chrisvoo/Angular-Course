import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthServiceService} from "../auth/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService
  ) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes()
    return this.http
      .put(`${environment.API_URL}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response)
      })
  }

  fetchRecipes() {
    // auth-interceptor will modify the request to automatically add the token
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
