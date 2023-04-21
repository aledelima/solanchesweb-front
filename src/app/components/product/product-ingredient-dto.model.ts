export interface ProductIngredientDTO {
    productId: number;
    ingredientId: number;
    relation: string;
    quantity: number;
    consumption: number;
    availability: boolean;
}