import { ProductIngredientDTO } from './product-ingredient-dto.model';


export interface ProductDTO {
    code: number;
    name: string;
    type: string;
    price: number;
    unit: string;
    productIngredients: ProductIngredientDTO[];
}