import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() totalItems = 0; 
  @Input() pageSize = 7;  
  @Input() pageSizeOptions = [7, 20, 50]; 
  @Input() showFirstLastButtons = true; 
  @Input() pageIndex = 0; 

  @Output() pageChange = new EventEmitter<PageEvent>();

  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }
}