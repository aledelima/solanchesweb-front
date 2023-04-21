import { ProductIngredient } from "./product-ingredient.model";
import { ProductType } from "./product-type.model";

export interface Product {
    id: number;
    code: number;
    name: string;
    unit: string;
    type: ProductType;
    price: number;
    productIngredients: ProductIngredient[];
}