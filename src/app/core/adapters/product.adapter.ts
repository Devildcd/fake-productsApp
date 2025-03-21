import { Injectable } from '@angular/core';

import { ApiResponse } from '../interfaces/api-response.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root',
  })
  export class ProductAdapter {
    adapt(apiProduct: ApiResponse): Product {
      return {
        id: apiProduct.id,
        name: apiProduct.name,
        description: apiProduct.description,
        price: apiProduct.price,
        imageUrl: apiProduct.image,
        isApproved: apiProduct.approved,
        createdAt: new Date(apiProduct.createdAt),
      };
    }
  }