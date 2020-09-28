import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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
}
