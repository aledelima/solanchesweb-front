import { Ingredient } from "./ingredient.model";

export interface IngredientsGetResponse {
    _embedded: {
      ingredients: Ingredient[];
      _links: {self: {href: string}};
    };
  }