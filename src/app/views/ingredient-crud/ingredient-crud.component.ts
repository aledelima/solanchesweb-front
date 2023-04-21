import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Ingredient-crud',
  templateUrl: './ingredient-crud.component.html',
  styleUrls: ['./ingredient-crud.component.css']
})
export class IngredientCrudComponent {

  constructor(private router: Router) {  }

  navigateToNewIngredient(): void {
    this.router.navigate(['/ingredients/new']);
  }

}
