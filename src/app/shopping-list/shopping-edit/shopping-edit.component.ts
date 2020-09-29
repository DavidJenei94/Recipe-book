import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild("f", {static: false}) shoppinglistForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    edidtedItem: Ingredient;

    constructor(private shoppinglistService: ShoppingListService) { }

    ngOnInit(): void {
        this.subscription = this.shoppinglistService.startedEditing.subscribe((index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.edidtedItem = this.shoppinglistService.getIngredient(index);
            this.shoppinglistForm.setValue({
                name: this.edidtedItem.name,
                amount: this.edidtedItem.amount
            })
        });
    }

    onSubmit(form: NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount)
        if (this.editMode){
            this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient)
        } else {
            this.shoppinglistService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    onClear(){
        this.shoppinglistForm.reset();
        this.editMode = false;
    }

    onDelete(){
        this.shoppinglistService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
