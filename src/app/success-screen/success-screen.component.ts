import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.css'],
})
export class SuccessScreenComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']); // Navigate to home screen
  }
}
