import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

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

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subStartedEditing = this.shoppingListService
      .startedEditing.subscribe((index: number) => {
        this.editMode = true
        this.editedItemIndex = index
        this.editedItem = this.shoppingListService.getIndedient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  ngOnDestroy(): void {
    this.subStartedEditing.unsubscribe()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onAdd(form: NgForm): void {
    const value = form.value;
    const ingredient= new Ingredient(
      value.name,
      value.amount
    )

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
    this.editMode = false;
    form.reset();
  }
}
