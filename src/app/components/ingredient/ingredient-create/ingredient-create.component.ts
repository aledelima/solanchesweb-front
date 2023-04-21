import { IngredientNew } from '../ingredient-new.model';
import { Router } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientCreateComponent {

  ingredient: IngredientNew = {
    name: '',
    unit: ''
  }

  constructor(private ingredientService: IngredientService, private router: Router) {}

  createIngredient() {
    this.ingredientService.create(this.ingredient).subscribe(() => {
      this.ingredientService.showMessage('Ingrediente Criado com sucesso!');
      this.router.navigate(['/ingredients']);
    });
  } 

  cancel(): void {
    this.router.navigate(['/ingredients']);
  }
}
