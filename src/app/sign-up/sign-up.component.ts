import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  profilePicture: string = '';
  result: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  signUp(): void {
    if (!this.username || !this.email || !this.password || !this.phone) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    let userObj = {
      username: this.username,
      email: this.email,
      password: this.password,
      userType: 'customer',
      phone: this.phone,
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
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Error: ' + resData.message;
        }
      },
      (error) => {
        console.error('Error during SignUp:', error);
        this.errorMessage = 'An error occurred during sign up';
      }
    );
  }
}
