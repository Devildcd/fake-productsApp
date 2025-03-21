import { Component, Input } from '@angular/core';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.css'
})
export class MainCardComponent {
  @Input() title = '';
}
