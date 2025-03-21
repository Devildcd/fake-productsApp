import { Component, OnInit, inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { AddCartService } from '../../../../core/services/add-cart.service';
import { SearchInputComponent } from "../search-input/search-input.component";


@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    SearchInputComponent
],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit{
  cartService = inject(AddCartService);
  cartItemCount = 0;

  ngOnInit() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count; 
    });
  }
}
