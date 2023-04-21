import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['./ingredient-update.component.css']
})
export class IngredientUpdateComponent implements OnInit {

  ingredient: Ingredient = {
    id: 0,
    name: '',
    unit: ''
  };

  constructor(
    private IngredientService: IngredientService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    const id:string = this.route.snapshot.paramMap.get('id')!;
    this.IngredientService.readById(id).subscribe(ingredient => {
      this.ingredient = ingredient;
    });
  }

  updateIngredient(): void {
    this.IngredientService.update(this.ingredient).subscribe(() => {
      this.IngredientService.showMessage('Ingrediente Atualizado com Sucesso!');
      this.router.navigate(['/ingredients']);
    });
  }

  deleteIngredient(): void {
    const id:string = this.route.snapshot.paramMap.get('id')!;
    this.IngredientService.delete(id).subscribe(() => {
      this.IngredientService.showMessage('Ingrediente Excluido com Sucesso!');
      this.router.navigate(['/ingredients']);
    });

  }

  cancel(): void {
    this.router.navigate(['/ingredients']);
  }
}
