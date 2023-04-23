import { Injectable } from '@angular/core';
import { Observable, concatMap, filter, from, map, mergeMap } from 'rxjs';
import { ProductIngredient } from './product-ingredient.model';
import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ProductIngredientListingService {

  constructor(private ingredientService: IngredientService) { }

  public filterNonlistedProductIngredients(existentProductIngredients: ProductIngredient[]): Observable<ProductIngredient[]> {
    let usedIngredientsId = existentProductIngredients.map(pi => pi.ingredient.id);
    return this.ingredientService.read()
      .pipe(
        map( ingredients => ingredients.filter(item => !usedIngredientsId.includes(item.id)) ), 
        map( ingredients => 
            ingredients.map(ingredient => {
              const pi: ProductIngredient = 
                {ingredient: ingredient, relation: "DEFAULT", quantity: 1, consumption: 1, availability: true};
              return pi;
            })
        )
      ); 
  }
}