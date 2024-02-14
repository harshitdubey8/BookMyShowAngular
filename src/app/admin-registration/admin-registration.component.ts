import { Component, Input } from '@angular/core';

import { UserService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrl: './admin-registration.component.css',
})
export class AdminRegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  profilePicture: string = '';
  result: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  signUp(): void {
    if (!this.username || !this.email || !this.password || !this.phone) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Validate email format
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

    let userObj = {
      username: this.username,
      email: this.email,
      password: this.password,
      userType: 'Admin',
      phone: this.phone,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
      profilePicUrl:
        this.profilePicture ||
        'https://cdn4.vectorstock.com/i/1000x1000/08/38/avatar-icon-male-user-person-profile-symbol-vector-20910838.jpg',
    };

    this.userService.signUp(userObj).subscribe(
      (resData: any) => {
        console.log(resData);
        // Navigate to home if signup successful
        if (resData.message === 'User created successfully') {
          sessionStorage.setItem('userEmail', this.email);

          window.location.replace('/home');
        } else {
          this.errorMessage = 'Error: ' + resData.message;
        }
      },
      (error) => {
        console.error('Error during SignUp:', error);
        this.errorMessage = error?.error?.message;
      }
    );
  }
}
