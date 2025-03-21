import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { PdfService } from '../../../../core/services/pdf.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, MatIconModule, MatDividerModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  constructor(private pdfService: PdfService) {}

  openPdf(): void {
    this.pdfService.openPdf('Instrucciones.pdf'); 
  }

  openGitHub(): void {
    const url = 'https://github.com/Devildcd/fake-productsApp/tree/main';
    window.open(url, '_blank');
  }
}
