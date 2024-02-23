import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {Recipe} from "./recipe.model";
import {filter, take} from "rxjs";
import {RecipeService} from "./recipe.service";

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  const recipeService: RecipeService = inject(RecipeService)
  const recipes = recipeService.getRecipes();

  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes()
  }

  return recipes
  /*
  .pipe(
    filter<Recipe[]>((recipes: Recipe[]) => recipes[route.paramMap.get('id')]),
    take(1)
  )
   */
};
