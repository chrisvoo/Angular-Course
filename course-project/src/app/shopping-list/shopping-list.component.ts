import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStore} from "../store/store.model";
import {startEdit} from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription


  constructor(private shoppingListService: ShoppingListService, private store: Store<AppStore>) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditItem(index: number): void {
    // this.shoppingListService.startedEditing.next(index)
    this.store.dispatch(startEdit({index}))
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingListService.getIngredients()
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients
    // })
  }
}
