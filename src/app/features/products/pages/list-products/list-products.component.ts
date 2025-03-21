import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, catchError, combineLatest, of } from 'rxjs';

import { MainCardComponent } from '../../../shared/components/main-card/main-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/interfaces/product.interface';
import ShowProductComponent from '../show-product/show-product.component';
import { AlertService } from '../../../../core/services/alert.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MainCardComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    PaginatorComponent,
],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export default class ListProductsComponent implements OnInit {
alertService = inject(AlertService);
productService = inject(ProductService);
dialog = inject(MatDialog);
filterService = inject(SearchService);

  // Observable that holds the list of products
products$!: Observable<Product[]>; 
// BehaviorSubject to track the current filter value (default is empty string)
filter$ = new BehaviorSubject<string>('');
// Total number of products, used for pagination or other logic
totalProducts = 0;
// BehaviorSubject to track the list of paginated products
paginatedProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
// Default page size for pagination
pageSize = 7;
// Current page index for pagination
pageIndex = 0;
// Available page size options for pagination
pageSizeOptions = [7, 20, 50];
// Whether to show the 'First' and 'Last' pagination buttons
showFirstLastButtons = true;
// Selected filter type (default is 'all')
selectedFilter: 'all' | 'approved' | 'disapproved' = 'all';
loading = true;

ngOnInit() {
  // Initialize the products observable by fetching the product data from the product service
  this.products$ = this.productService.getProducts();

  // Use combineLatest to combine the product data and filter stream
  combineLatest([this.products$, this.filterService.filter$]).subscribe(
    ([products, filter]) => {
      // Log the products and filter (for debugging purposes only)
      // console.log('Products y filter:', products, filter); 

      // Filter products based on the approval status
      let filteredProducts = products.filter(product => product.isApproved);

      // Apply the filter if it's not empty
      if (filter) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        );
      }

      // Update the total number of products after applying the filter
      this.totalProducts = filteredProducts.length;
      this.loading = false;

      // Update the paginated products list
      this.updatePaginatedProducts(filteredProducts);
    }
  );
}

  

  // Opens a dialog to show product details and handles the result when the dialog is closed
openProductDetailsDialog(product: Product) {
  const dialogRef = this.dialog.open(ShowProductComponent, {
    width: 'auto',
    data: product, // Passing the selected product data to the dialog
  });

  dialogRef.afterClosed().subscribe(() => {
    // Log (for debugging purposes only)
    // console.log('closed: ', result);
  });
}

// Toggles the approval status of a product and updates it in the API and IndexedDB
toggleApproval(isChecked: boolean, product: Product): void {
  const updatedProduct: Product = { ...product, isApproved: isChecked };

  // Update the product's approval status via the product service
  this.productService.updateApprovalStatus(updatedProduct).subscribe({
    next: () => {
      // Log success message (remove in production)
      // console.log('Product updated in API and IndexedDB');
    },
    error: () => {
      // Log error message (remove in production)
      // console.error('Error updating product', err);
    }
  });
}

// Applies the filter by updating the filter BehaviorSubject with the trimmed and lowercase value
applyFilter(filterValue: string) {
  this.filter$.next(filterValue.trim().toLowerCase());
}

// Confirms the deletion of a product and handles the deletion process
onDeleteProduct(id: string): void {
  // Show confirmation alert to the user before deleting the product
  this.alertService.confirm('Delete Product', 'Are you sure you want to delete this product?', 'Confirm', 'Cancel')
    .subscribe((confirmed) => {
      if (confirmed) {
        // Call the product service to delete the product
        this.productService.deleteProduct(id).pipe(
          catchError(() => {
            // Show error alert if the deletion fails
            this.alertService.alertMessage('Error', 'There was a problem deleting the product', 'error');
            // Log the error for debugging
            // console.error('Error deleting product:', error);
            return of(null); // Return an observable to continue the flow
          })
        ).subscribe({
          next: () => {
            // Show success alert if the product is successfully deleted
            this.alertService.alertMessage('Deleted', 'The product has been successfully deleted', 'success');
            // Log success message (remove in production)
            // console.log('Product deleted successfully');
            
            // Refresh the product list after deletion
            this.products$ = this.productService.getProducts();
            
            // Update the paginated product list and total product count
            this.products$.subscribe((products) => {
              this.totalProducts = products.length;
              this.updatePaginatedProducts(products);
            });
          },
          error: () => {
            // Log error if the deletion process fails
            // console.error('There was a problem deleting the product', err);
          },
        });
      }
    });
}

  // Handles page event changes and updates the paginated products
handlePageEvent(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;

  this.products$.subscribe((products) => {
    this.updatePaginatedProducts(products);
  });
}

// Updates the list of products for the current page
updatePaginatedProducts(products: Product[]) {
  const startIndex = this.pageIndex * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);
  this.paginatedProducts$.next(paginatedProducts);
}

// Handles the selection of a filter and updates the paginated products based on the filter
onFilterSelected(filter: 'all' | 'approved' | 'disapproved') {
  this.selectedFilter = filter;
  this.products$.subscribe((products) => {
    const filteredProducts = this.filterProducts(products, filter);
    this.totalProducts = filteredProducts.length;
    this.updatePaginatedProducts(filteredProducts);
  });
}

// Filters products based on the selected filter (approved, disapproved, or all)
private filterProducts(products: Product[], filter: 'all' | 'approved' | 'disapproved'): Product[] {
  switch (filter) {
    case 'approved':
      return products.filter(product => product.isApproved === true);
    case 'disapproved':
      return products.filter(product => product.isApproved === false);
    default:
      return products; // 'all'
  }
}
}
