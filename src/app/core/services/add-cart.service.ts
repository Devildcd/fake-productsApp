import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  private cartItemCountSubject = new BehaviorSubject<number>(0); 
  cartItemCount$ = this.cartItemCountSubject.asObservable(); 

  incrementCart() {
    const currentCount = this.cartItemCountSubject.value;
    this.cartItemCountSubject.next(currentCount + 1); 
  }

}
