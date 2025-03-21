import { Component, Input } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';

  constructor(private filterService: SearchService) {}

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterService.updateFilter(filterValue); 
  }
}
