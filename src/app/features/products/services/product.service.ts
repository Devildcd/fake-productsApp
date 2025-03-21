import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';

import { ProductAdapter } from '../../../core/adapters/product.adapter';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';
import { IndexedDBService } from '../../../core/services/indexed-db.service';
import { Product } from '../../../core/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;

  adapter = inject(ProductAdapter);
  indexedDBService = inject(IndexedDBService);
  http = inject(HttpClient);

  // Fetches products from IndexedDB or API if not found in IndexedDB
  getProducts(): Observable<Product[]> {
    return this.indexedDBService.getProducts().pipe(
      switchMap((productsFromIndexedDB) => {
        // If products exist in IndexedDB, return them after adapting the format
        if (productsFromIndexedDB.length > 0) {
          return of(
            productsFromIndexedDB.map((item) => this.adapter.adapt(item))
          );
        } else {
          // If no products in IndexedDB, fetch from the API
          return this.http.get<ApiResponse[]>(this.baseUrl).pipe(
            tap((apiProducts) => {
              // Save the fetched products into IndexedDB
              this.indexedDBService.saveProducts(apiProducts).subscribe({
                next: () => {
                  // console.log('Products saved to IndexedDB'); // Log commented out for production
                },
                error: (err) =>
                  console.error('Error saving products to IndexedDB', err),
              });
            }),
            map((apiProducts) =>
              apiProducts.map((item) => this.adapter.adapt(item))
            ),
            catchError((error) => {
              console.error('Error fetching products from API', error);
              return of([]); // Return an empty array in case of error
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error fetching products from IndexedDB or API', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  // Fetches a product by its ID from IndexedDB or returns null if not found
  getProductById(id: string): Observable<Product | null> {
    return this.indexedDBService.getProductById(id).pipe(
      switchMap((productFromIndexedDB) => {
        // If the product is found in IndexedDB, return the adapted product
        if (productFromIndexedDB) {
          return of(this.adapter.adapt(productFromIndexedDB)); // Return adapted product
        } else {
          // console.error('Product not found in IndexedDB'); // Log commented out for production
          return of(null); // Return null if the product is not found
        }
      }),
      catchError((error) => {
        console.error('Error fetching product from IndexedDB', error);
        return of(null); // Return null in case of an error
      })
    );
  }

  // Updates the approval status of a product and syncs it with IndexedDB
  updateApprovalStatus(product: Product): Observable<void> {
    // Convert the `Product` model to the `ApiResponse` format
    const apiProduct: ApiResponse = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.imageUrl,
      approved: product.isApproved,
      createdAt: product.createdAt,
    };

    // Send the update request to the API and update in IndexedDB
    return this.http
      .put<ApiResponse>(`${this.baseUrl}/${apiProduct.id}`, apiProduct)
      .pipe(switchMap(() => this.indexedDBService.updateProduct(apiProduct)));
  }

  // Deletes a product by its ID from both the API and IndexedDB
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      map(() => {
        // Delete the product from IndexedDB
        this.indexedDBService.deleteProduct(id).subscribe({
          next: () => {
            // console.log('Product deleted from IndexedDB'); // Log commented out for production
          },
          error: (err) => console.error('Error deleting from IndexedDB:', err),
        });
      }),
      catchError((error) => {
        console.error('Error deleting product from API:', error);
        throw error; // Re-throw error to propagate it
      })
    );
  }
}
