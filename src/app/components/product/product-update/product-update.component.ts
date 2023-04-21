import { ProductIngredient } from './../product-ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductType } from '../product-type.model';
import { FormBuilder } from '@angular/forms';
import { IngredientService } from '../../ingredient/ingredient.service';
import { IngredientType } from '../ingredient-type.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: ProductIngredient[] = [
  
];

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    id: 0,
    code: 0,
    name: '',
    unit: '',
    type: ProductType.SANDWICH,
    price: 0,
    productIngredients: []
  };

  defaultIngredients: ProductIngredient[] = [];
  optionalIngredients: ProductIngredient[] = [];

  type = ProductType;
  enumKeys: string[] = [];
  enumValues: string[] = [];

  displayedColumns: string[] = ['id', 'name', 'consuption', 'availability', 'actions'];
  

  constructor(
    private productService: ProductService, 
    private ingredientService: IngredientService,
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.enumKeys = Object.keys(ProductType);
    this.enumValues = Object.values(ProductType);
    console.log(this.enumKeys);
   }

  ngOnInit(): void {
    const id:string = this.route.snapshot.paramMap.get('id')!;
    // this.productService.readById(id).subscribe(product => {
      // this.product = product;
      this.product = this.productService.readById(id);
      this.defaultIngredients = this.product.productIngredients.filter(e => e.relation=="DEFAULT");//IngredientType.DEFAULT);
      this.optionalIngredients = this.product.productIngredients.filter(e => e.relation=="OPTIONAL");//IngredientType.OPTIONAL);
      console.log(this.product);
      console.log(ProductType.SANDWICH);
    // });
    this.ingredientService.read().subscribe(ingredients => {

    })
  }

  updateIngredient(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto Atualizado com Sucesso!');
      this.router.navigate(['/products']);
    });
  }

  deleteIngredient(): void {
    const id:string = this.route.snapshot.paramMap.get('id')!;
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('Produto Excluido com Sucesso!');
      this.router.navigate(['/products']);
    });

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
