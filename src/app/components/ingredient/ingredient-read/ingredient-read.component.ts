import { map } from 'rxjs';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IngredientReadDataSource } from './ingredient-read-datasource';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';
import { Router } from '@angular/router';
import { IngredientExclusionComponent } from '../ingredient-exclusion/ingredient-exclusion.component';

@Component({
  selector: 'app-ingredient-read',
  templateUrl: './ingredient-read.component.html',
  styleUrls: ['./ingredient-read.component.css']
})
export class IngredientReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Ingredient>;
  dataSource: IngredientReadDataSource;

  ingredients: Ingredient[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'unit', 'actions'];

  constructor(
      private IngredientService: IngredientService, 
      private router: Router,
      public dialog: MatDialog
    ) {
      this.dataSource = new IngredientReadDataSource();
  }
  
  ngOnInit(): void {
    this.IngredientService.read().subscribe(ingredients => {
      this.ingredients = ingredients;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openExclusionDialog(id: string): void {
    const dialogRef = this.dialog.open(IngredientExclusionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result=="true") {
        console.log(`deleting ${id}`)
        this.IngredientService.delete(id).subscribe(() => {
          this.IngredientService.showMessage('Ingrediente Excluido com Sucesso!');
          window.location.reload();
          // this.router.navigate(['/ingredients']);
        });
      }
    });
  }

}
