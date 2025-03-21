import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private filterSubject = new BehaviorSubject<string>('');

  filter$ = this.filterSubject.asObservable();

  updateFilter(filterValue: string) {
    this.filterSubject.next(filterValue.trim().toLowerCase());
  }
}
