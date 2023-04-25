import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { IngredientCrudComponent } from './views/ingredient-crud/ingredient-crud.component';
import { IngredientCreateComponent } from './components/ingredient/ingredient-create/ingredient-create.component';
import { IngredientUpdateComponent } from './components/ingredient/ingredient-update/ingredient-update.component';
import { IngredientExclusionComponent } from './components/ingredient/ingredient-exclusion/ingredient-exclusion.component';
import { IngredientReadComponent } from './components/ingredient/ingredient-read/ingredient-read.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductReadComponent } from './components/product/product-read/product-read.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductExclusionComponent } from './components/product/product-exclusion/product-exclusion.component';
import { ProductIngredientListComponent } from './components/product/product-ingredient-list/product-ingredient-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    IngredientCrudComponent,
    IngredientCreateComponent,
    IngredientReadComponent,
    IngredientUpdateComponent,
    IngredientExclusionComponent,
    IngredientReadComponent,
    ProductCrudComponent,
    ProductReadComponent,
    ProductUpdateComponent,
    ProductExclusionComponent,
    ProductIngredientListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
