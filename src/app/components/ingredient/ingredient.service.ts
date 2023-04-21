import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { IngredientNew } from './ingredient-new.model';
import { IngredientsGetResponse } from './ingredients-get-response.model';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  baseUrl = `${API_CONFIG.baseUrl}/ingredients`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  read(): Observable<Ingredient[]> {
    return this.http.get<IngredientsGetResponse>(`${this.baseUrl}?size=300&sort=name`)
    // return this.http.get<IngredientsGetResponse>(this.baseUrl, {headers: new HttpHeaders(this.headers)})
            .pipe(map(response => response._embedded.ingredients));
  }

  readById(id: string): Observable<Ingredient> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Ingredient>(url);
  }

  create(ingredient: IngredientNew) {
    return this.http.post<Ingredient>(this.baseUrl, ingredient);
  }

  update(ingredient: Ingredient): Observable<Ingredient> {
    const url = `${this.baseUrl}/${ingredient.id}`;
    return this.http.put<Ingredient>(url, ingredient);
  }
  
  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
