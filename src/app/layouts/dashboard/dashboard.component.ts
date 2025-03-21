import { Component, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from '../../features/shared/components/side-menu/side-menu.component';
import { TopMenuComponent } from '../../features/shared/components/top-menu/top-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    SideMenuComponent,
    TopMenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  isDesktop = window.innerWidth > 968;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isDesktop = window.innerWidth > 968;
  }
}
