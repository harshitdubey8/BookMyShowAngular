import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  @Input() getUserDetails: any = null;
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
      userType: 'customer',
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
          this.getUserDetails?.(this.email);
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
