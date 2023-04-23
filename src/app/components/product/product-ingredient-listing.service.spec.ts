import { of } from "rxjs";
import { ProductIngredientListingService } from "./product-ingredient-listing.service";
import { ProductIngredient } from "./product-ingredient.model";
import { HttpClient } from "@angular/common/http";
import { IngredientService } from "../ingredient/ingredient.service";
import { Ingredient } from "../ingredient/ingredient.model";

describe('ProductIngredientListingService', () => {

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let ingredientService: IngredientService;
  let productIngredientListService: ProductIngredientListingService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    ingredientService = new IngredientService(null: any, httpClientSpy);
    productIngredientListService = new ProductIngredientListingService(ingredientService);
  });

  it('Should return filtered list', (done: DoneFn) => {

    const expectedIngredients: Ingredient[] = [
      {id: 1, name:"Ingredient 1", unit: "Unit1"},
      {id: 2, name:"Ingredient 2", unit: "Unit2"},
      {id: 3, name:"Ingredient 3", unit: "Unit3"},
      {id: 4, name:"Ingredient 4", unit: "Unit4"}
    ];

    const expectedList: ProductIngredient[] =
      [
        {ingredient: {id: 2, name:"Ingredient 2", unit: "Unit2"}, relation: "DEFAULT", quantity: 1, consumption: 1, availability: true},
        {ingredient: {id: 4, name:"Ingredient 4", unit: "Unit4"}, relation: "DEFAULT", quantity: 1, consumption: 1, availability: true}
      ]
    ;

    // const payload: string = JSON.parse("{\"_embedded\": {}}");
    const payload: string = JSON.parse(
      `
      {"_embedded":
        {"ingredients": [
          {"id": 1, "name": "Ingredient 1", "unit": "Unit1"},
          {"id": 2, "name": "Ingredient 2", "unit": "Unit2"},
          {"id": 3, "name": "Ingredient 3", "unit": "Unit3"},
          {"id": 4, "name": "Ingredient 4", "unit": "Unit4"}
        ]}
      }
      `
    );

    const productIngredients: ProductIngredient[] = [
      {
        ingredient: {id: 1, name:"Ingredient 1", unit: "Unit1"},
        relation: "DEFAULT",
        quantity: 1,
        consumption: 1,
        availability: true
      },
      {
        ingredient: {id: 3, name:"Ingredient 3", unit: "Unit3"},
        relation: "DEFAULT",
        quantity: 1,
        consumption: 1,
        availability: true
      }
    ];

    // httpClientSpy.get.and.returnValue(of(expectedIngredients));
    httpClientSpy.get.and.returnValue(of(payload));

    ingredientService.read().subscribe({
      next: returnedIngredients => {
        expect(returnedIngredients)
          .withContext('Expected Ingredients')
          .toEqual(expectedIngredients);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('Single call')
      .toBe(1);



    productIngredientListService.filterNonlistedProductIngredients(productIngredients).subscribe({
      next: returnedList => {
        expect(returnedList)
          .withContext('Expected filtered ingredient list')
          .toEqual(expectedList)
      }
    })

  });


});
