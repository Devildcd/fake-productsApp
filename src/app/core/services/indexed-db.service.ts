import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private db!: IDBPDatabase;

  constructor() {
    this.initDB().subscribe({
      // next: () => console.log('IndexedDB initialized successfully'),
      // error: (err) => console.error('Error initializing IndexedDB:', err),
    });
  }

  // Initializes the IndexedDB for storing products
  private initDB(): Observable<void> {
    return from(
      openDB('ProductDB', 1, {
        upgrade(db) {
          // Create the 'products' object store if it doesn't exist
          if (!db.objectStoreNames.contains('products')) {
            db.createObjectStore('products', { keyPath: 'id' });
          }
        },
      })
    ).pipe(
      switchMap((db) => {
        // Store the reference to the database instance
        this.db = db;
        return of(undefined); // Return undefined as an Observable
      }),
      catchError(() => {
        // console.error('Error initializing IndexedDB:', error); // Log commented out for production
        return of(undefined); // Return undefined in case of an error
      })
    );
  }

  // Retrieves all products from IndexedDB
  getProducts(): Observable<ApiResponse[]> {
    return new Observable((observer) => {
      // Initialize the database and handle errors if any
      this.initDB().subscribe({
        next: () => {
          if (this.db) {
            // Attempt to fetch all products from the 'products' object store
            this.db
              .getAll('products')
              .then((products) => {
                observer.next(products); // Emits the products to the observer
                observer.complete(); // Completes the observable
              })
              .catch((error) => {
                observer.error(`Error retrieving products: ${error}`); // Handles error during product retrieval
              });
          } else {
            observer.error('Database not initialized correctly'); // Error if the DB is not initialized
          }
        },
        error: (err) => {
          observer.error(`Error initializing database: ${err}`); // Handles error during DB initialization
        },
      });
    });
  }

  // Method to retrieve a product by its ID from IndexedDB
  getProductById(id: string): Observable<ApiResponse | undefined> {
    return new Observable((observer) => {
      // Initialize the database before accessing it
      this.initDB().subscribe({
        next: () => {
          if (this.db) {
            // Attempt to retrieve the product from the 'products' store
            this.db
              .get('products', id)
              .then((product) => {
                if (product) {
                  observer.next(product); // Emit the found product
                } else {
                  observer.error('Product not found'); // Emit an error if no product is found
                }
                observer.complete(); // Complete the observable after emitting the result
              })
              .catch((error) => {
                observer.error(`Error fetching product: ${error}`); // Handle any errors during retrieval
              });
          } else {
            observer.error('Database not initialized correctly'); // Error if the DB isn't initialized
          }
        },
        error: (err) => {
          observer.error(`Error initializing the database: ${err}`); // Handle any errors initializing the DB
        },
      });
    });
  }

  // Method to save or update products in IndexedDB
  saveProducts(products: ApiResponse[]): Observable<void> {
    return from(
      (async () => {
        if (this.db) {
          // Start a readwrite transaction for the 'products' store
          const tx = this.db.transaction('products', 'readwrite');
          const store = tx.objectStore('products');

          // Iterate over the products and save or update each one
          for (const product of products) {
            await store.put(product); // Saves or updates the product in the store
          }

          // Ensure the transaction is complete before proceeding
          await tx.done;
        } else {
          throw new Error('Database not initialized correctly'); // Error if DB is not initialized
        }
      })()
    ).pipe(
      catchError((error) => {
        // Handles errors by logging and returning an empty observable
        console.error('Error saving products in IndexedDB:', error);
        return of(undefined); // Return an empty observable when an error occurs
      })
    );
  }

  // Method to update a product in IndexedDB
  updateProduct(product: ApiResponse): Observable<void> {
    return new Observable((observer) => {
      // Initialize the database
      this.initDB().subscribe({
        next: () => {
          if (this.db) {
            // Update the product in IndexedDB
            this.db
              .put('products', product)
              .then(() => {
                observer.next(); // Notify that the product was successfully updated
                observer.complete(); // Complete the observable
              })
              .catch((error) =>
                observer.error(`Error updating the product: ${error}`)
              ); // Handle errors
          } else {
            observer.error('Database not initialized correctly'); // Error if DB is not initialized
          }
        },
        error: (err) =>
          observer.error(`Error initializing the database: ${err}`), // Handle errors during DB initialization
      });
    });
  }

  // Method to delete a product by its ID from IndexedDB
  deleteProduct(id: string): Observable<void> {
    return from(
      (async () => {
        // Check if the database is initialized
        if (this.db) {
          // Start a readwrite transaction for the 'products' store
          const tx = this.db.transaction('products', 'readwrite');
          const store = tx.objectStore('products');
          await store.delete(id); // Delete the product by its ID
          await tx.done; // Ensure the transaction is complete before proceeding
        } else {
          throw new Error('Database not initialized correctly'); // Error if DB is not initialized
        }
      })()
    ).pipe(
      catchError((error) => {
        // Log the error and return an empty observable
        console.error('Error deleting product in IndexedDB:', error);
        return of(undefined); // Return an empty observable when an error occurs
      })
    );
  }
}
