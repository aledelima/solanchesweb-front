import { ProductIngredient } from './product-ingredient.model';
export interface SelectableProductIngredient {
    chosen: boolean;
    productIngredient: ProductIngredient;
}

