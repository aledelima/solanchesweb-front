import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientCrudComponent } from "./views/ingredient-crud/ingredient-crud.component";
import { IngredientCreateComponent } from './components/ingredient/ingredient-create/ingredient-create.component';
import { IngredientUpdateComponent } from './components/ingredient/ingredient-update/ingredient-update.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';

const routes: Routes = [
  {
    path: "",
    component: IngredientCrudComponent
  },
  {
    path: "ingredients",
    component: IngredientCrudComponent
  },
  {
    path: "ingredients/new",
    component: IngredientCreateComponent
  },
  {
    path: "ingredients/:id",
    component: IngredientUpdateComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/:id",
    component: ProductUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
