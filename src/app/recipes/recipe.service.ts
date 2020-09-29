import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            "A test recipe",
            "test desc",
            "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
            [new Ingredient("Apple", 2), new Ingredient("Peach", 5)]),
        new Recipe(
            "Another test recipe",
            "test desc",
            "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
            [new Ingredient("Bread", 1), new Ingredient("Flour", 2)])
    ];

    constructor(private shoppinglistService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppinglistService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
