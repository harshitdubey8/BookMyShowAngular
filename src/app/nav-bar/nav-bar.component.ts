import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() user: any = null;

  constructor(private router: Router) {}
  onLogOut(): void {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
