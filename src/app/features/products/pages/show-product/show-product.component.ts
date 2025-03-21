import { Component, inject } from '@angular/core';

import { Product } from '../../../../core/interfaces/product.interface';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { AddCartService } from '../../../../core/services/add-cart.service';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export default class ShowProductComponent {
  data: Product = inject(MAT_DIALOG_DATA);
  addCartService: AddCartService = inject(AddCartService);

  addToCart() {
    this.addCartService.incrementCart(); 
  }
}
