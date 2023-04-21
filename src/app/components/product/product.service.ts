import { Ingredient } from './../ingredient/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { Product } from './product.model';
import { ProductsGetResponse } from './products-get-response.model';
import { ProductType } from './product-type.model';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${API_CONFIG.baseUrl}/products`;

  product: Product = {
    id: 0,
    code: 0,
    name: '',
    unit: '',
    type: ProductType.SANDWICH,
    price: 0,
    productIngredients: []
  };

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient, 
    private ingredientService: IngredientService
    ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  read(): Observable<Product[]> {
    return this.http.get<ProductsGetResponse>(`${this.baseUrl}?size=300&sort=name`)
            .pipe(map(response => response._embedded.products));
  }

  // readById(id: string): Observable<Product> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get<Product>(url);
  // }

  readById(id: string): Product {
    const url = `${this.baseUrl}/${id}`;
    this.http.get<Product>(url).subscribe(product => {this.product = product});
    return this.product;
  }

  // create(Product: ProductNew) {
  //   return this.http.post<Product>(this.baseUrl, Product);
  // }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }
  
  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
