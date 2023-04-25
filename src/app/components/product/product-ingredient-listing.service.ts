import { Injectable } from '@angular/core';
import { Observable, concatMap, filter, from, map, mergeMap } from 'rxjs';
import { ProductIngredient } from './product-ingredient.model';
import { IngredientService } from '../ingredient/ingredient.service';
import { SelectableProductIngredient } from './selectable-product-ingredient.model';
import { ProductIngredientListComponent } from './product-ingredient-list/product-ingredient-list.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductIngredientListingService {

  newProductIngredients: ProductIngredient[] = [];

  constructor(
    private ingredientService: IngredientService,
    // public dialog: MatDialog
  ) { }

  // addProductIngredients(existentProductIngredients: ProductIngredient[]): Observable<ProductIngredient[]> {

  //   return this.filterNonlistedProductIngredients(existentProductIngredients)
  //     .pipe( map( productIngredients => 
  //       productIngredients.map(pi => {
  //           const spi: SelectableProductIngredient = 
  //             {chosen: false, productIngredient: pi}
  //           return spi;
  //         })
  //     ))
  //     .subscribe( productIngredients => 
  //       this.openDialog(productIngredients) );
  // }

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



  // openDialog(productIngredientList: SelectableProductIngredient[]): void {

  //   const dialogRef = this.dialog.open(ProductIngredientListComponent, {
  //     data: productIngredientList
  //   });

  //   return dialogRef.afterClosed()
  //     .pipe( 
  //       map( choices => choices.filter( (choice: SelectableProductIngredient) => choice.chosen==true) ),
  //       map( choices => choices.map( (element: SelectableProductIngredient) => element.productIngredient) )
  //     )
  //     .subscribe( newProductIngredients => this.newProductIngredients = newProductIngredients);  

      // .subscribe( (result: ProductIngredient[]) => {
      //   result.forEach((pi: ProductIngredient) => this.product.productIngredients.push(pi));
        // this.defaultIngredients = this.product.productIngredients
        //   .filter(e => e.relation == "DEFAULT")
        //   .sort((a, b) => (a.ingredient.name < b.ingredient.name) ? -1 : (a.ingredient.name == b.ingredient.name) ? 0 : 1);
        // this.optionalIngredients = this.product.productIngredients
        //   .filter(e => e.relation == "OPTIONAL")
        //   .sort((a, b) => (a.ingredient.name < b.ingredient.name) ? -1 : (a.ingredient.name == b.ingredient.name) ? 0 : 1);
        //}
      //);
  // }
}