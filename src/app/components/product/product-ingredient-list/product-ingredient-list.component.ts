import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectableProductIngredient } from '../selectable-product-ingredient.model';

@Component({
  selector: 'app-product-ingredient-list',
  templateUrl: './product-ingredient-list.component.html',
  styleUrls: ['./product-ingredient-list.component.css']
})
export class ProductIngredientListComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductIngredientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectableProductIngredient[],
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }
}