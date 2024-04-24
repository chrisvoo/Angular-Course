import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import {AppStore} from "../../store/store.model";
import {addIngredient, deleteIngredient, stopEdit, updateIngredient} from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm
  subStartedEditing: Subscription
  editMode = false
  editedItemIndex: number;
  editedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService, private store: Store<AppStore>) {
  }

  ngOnInit(): void {
    this.subStartedEditing = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true
        this.editedItem = stateData.editedIngredient
        this.editedItemIndex = stateData.editedIngredientIndex
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false
      }
    })
    // this.subStartedEditing = this.shoppingListService
    //   .startedEditing.subscribe((index: number) => {
    //     this.editMode = true
    //     this.editedItemIndex = index
    //     this.editedItem = this.shoppingListService.getIndedient(index)
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   })
  }

  ngOnDestroy(): void {
    this.subStartedEditing.unsubscribe()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
    this.store.dispatch(stopEdit())
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(deleteIngredient())
    this.onClear()
  }

  onAdd(form: NgForm): void {
    const value = form.value;
    const ingredient= new Ingredient(
      value.name,
      value.amount
    )

    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
      this.store.dispatch(updateIngredient({ingredient}))
    } else {
      // this.shoppingListService.addIngredient(ingredient)
      this.store.dispatch(addIngredient({value: ingredient}))
    }
    this.editMode = false;
    form.reset();
  }
}
