import { Ingredient } from './../ingredient/ingredient.model';
export interface ProductIngredient {
    ingredient: Ingredient;
    relation: string;
    quantity: number;
    consumption: number;
    availability: boolean;

}

