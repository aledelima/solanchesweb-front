import { ProductIngredientListingService } from './../product-ingredient-listing.service';
import { SelectableProductIngredient } from './../selectable-product-ingredient.model';
import { ProductIngredient } from './../product-ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductType } from '../product-type.model';
import { FormBuilder } from '@angular/forms';
import { IngredientService } from '../../ingredient/ingredient.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductIngredientListComponent } from '../product-ingredient-list/product-ingredient-list.component';
import { filter, map } from 'rxjs';

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

  isUpdate: boolean = false;
  action: string = "Criação";

  defaultIngredients: ProductIngredient[] = [];
  optionalIngredients: ProductIngredient[] = [];

  type = ProductType;
  enumKeys: string[] = [];
  enumValues: string[] = [];

  displayedColumns: string[] = ['id', 'name', 'consumption', 'availability', 'actions'];
  

  constructor(

    private productService: ProductService, 
    private ingredientService: IngredientService,
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { 
    this.enumKeys = Object.keys(ProductType);
    this.enumValues = Object.values(ProductType);
    console.log(this.enumKeys);
   }

  ngOnInit(): void {

    const id: string = this.route.snapshot.paramMap.get('id')!;
    
    if (id != 'new') {
      this.isUpdate = true;
      this.action = "Atualização";

      this.productService.readById(id).subscribe(product => {
        this.product = product;
        this.defaultIngredients = product.productIngredients.filter(e => e.relation=="DEFAULT");
        this.optionalIngredients = product.productIngredients.filter(e => e.relation=="OPTIONAL");
      });
    }
  }

  saveProduct(): void {
    console.log("Produto novo: " + this.product);

    if (this.isUpdate) {
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage('Produto Atualizado com Sucesso!');
        this.router.navigate(['/products']);
      });
    } else {
      console.log("Fazendo o create")
      this.productService.create(this.product).subscribe(() => {
        this.productService.showMessage('Produto Criado com Sucesso!');
        this.router.navigate(['/products']);
      });
    }
  
  }

  cancel(): void {

    this.router.navigate(['/products']);
  }

  deleteProductIngredient(productIngredient: ProductIngredient) {

    this.product.productIngredients = 
      this.product.productIngredients.filter(e => e.ingredient.id != productIngredient.ingredient.id);
    this.displayProductIngredients();
  }

  addProductIngredients(type: string) {

    const listService: ProductIngredientListingService = 
      new ProductIngredientListingService(this.ingredientService);
  
    const nonListedIngredients = listService

    .filterNonlistedProductIngredients(this.product.productIngredients)
      .pipe( map( productIngredients => 
        productIngredients.map(pi => {
            pi.relation=type;
            const spi: SelectableProductIngredient = 
              {chosen: false, productIngredient: pi}
            return spi;
          })
      ))
      .subscribe( productIngredients => 
        this.openDialog(productIngredients) );
  }

  openDialog(productIngredientList: SelectableProductIngredient[]): void {

    const dialogRef = this.dialog.open(ProductIngredientListComponent, {
      data: productIngredientList
    });

    dialogRef.afterClosed()
      .pipe( 
        map( choices => choices.filter( (choice: SelectableProductIngredient) => choice.chosen==true) ),
        map( choices => choices.map( (element: SelectableProductIngredient) => element.productIngredient) )
      )  
      .subscribe((result: ProductIngredient[]) => {
        result.forEach((pi: ProductIngredient) => this.product.productIngredients.push(pi));
        this.displayProductIngredients();
        }
      );
  }

  //To update tables of Default and Optional Product Ingredients
  private displayProductIngredients() {
    this.defaultIngredients = 
      this.product.productIngredients
        .filter(e => e.relation=="DEFAULT")
        .sort((a, b) => (a.ingredient.name < b.ingredient.name) ? -1 : (a.ingredient.name == b.ingredient.name) ? 0 : 1);
    
    this.optionalIngredients = 
      this.product.productIngredients
        .filter(e => e.relation=="OPTIONAL")
        .sort((a, b) => (a.ingredient.name < b.ingredient.name) ? -1 : (a.ingredient.name == b.ingredient.name) ? 0 : 1);
  }
}
