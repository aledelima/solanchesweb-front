import { map } from 'rxjs';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductReadDataSource } from './product-read-datasource';

import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductExclusionComponent } from '../product-exclusion/product-exclusion.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductReadDataSource;

  products: Product[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'code', 'name', 'price', 'actions'];

  constructor(
      private ProductService: ProductService, 
      private router: Router,
      public dialog: MatDialog
    ) {
      this.dataSource = new ProductReadDataSource();
  }
  
  ngOnInit(): void {

    this.ProductService.read().subscribe(products => {
      this.products = products;
    })
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openExclusionDialog(id: string): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: "Confirma a exclusão desse produto?"})

    dialogRef.afterClosed().subscribe(result => {
      if (result=="true") {
        console.log(`deleting ${id}`)
        this.ProductService.delete(id).subscribe(() => {
          this.ProductService.showMessage('Produto Excluido com Sucesso!');
          this.ngOnInit();
          this.ngAfterViewInit();
        });
      }
    });
  }

}
