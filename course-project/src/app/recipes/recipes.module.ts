import { NgModule } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "../auth/auth.guard";
import {recipesResolver} from "./recipes.resolver";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  { path: 'recipes',
    component: RecipesComponent,
    canActivate: [
      authGuard
    ],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent }, // before :id, otherwise new may be interpreted like an ID
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: recipesResolver } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: recipesResolver } }
    ]
  }
];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
  ],
  exports: [

  ]
})
export class RecipesModule { }
