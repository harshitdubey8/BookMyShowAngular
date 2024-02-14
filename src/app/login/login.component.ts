import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() getUserDetails: any = null;

  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Add an error message property

  constructor(private router: Router, private userService: UserService) {}

  handleEmailChange(event: any): void {
    this.email = event.target.value;
  }

  handlePasswordChange(event: any): void {
    this.password = event.target.value;
  }

  onLogin(): void {
    // checking if the fields are not empty
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields'; // Set error message
      return;
    }
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Validate password strength (e.g., minimum length)
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (resData) => {
        console.log(resData);
        if (resData.message === 'User already exists') {
          sessionStorage.setItem('userEmail', this.email);
          this.getUserDetails?.(this.email);

          window.location.replace('/home');
        } else {
          // Handle invalid user id or password
          this.errorMessage = 'Invalid User Id or Password'; // Set error message
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login'; // Set error message
      }
    );
  }
}
