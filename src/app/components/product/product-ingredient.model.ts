import { Ingredient } from './../ingredient/ingredient.model';
import { IngredientType } from './ingredient-type.model';
export interface ProductIngredient {
    ingredient: Ingredient;
    relation: string;
    quantity: number;
    consumption: number;
    availability: boolean;

}

