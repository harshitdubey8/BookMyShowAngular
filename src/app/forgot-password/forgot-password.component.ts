import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  password: string = '';

  securityQuestion: string = '';
  securityAnswer: string = '';

  result: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  changePassword(): void {
    if (
      !this.securityQuestion ||
      !this.email ||
      !this.password ||
      !this.securityAnswer
    ) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    const url = 'http://localhost:80/api/changePassword';
    const userObj = {
      email: this.email,
      password: this.password,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
    };

    this.http.put<any>(url, userObj).subscribe(
      (resData) => {
        console.log(resData);
        if (resData.message === 'Password Changed Successfully') {
          alert(resData.message);
          // Navigate to login page on successful password change
          this.router.navigate(['/login'], { replaceUrl: true });
        } else {
          this.errorMessage = 'Invalid User or Security Question/Answer';
        }
      },
      (error) => {
        console.error('Error during password change:', error);
        this.errorMessage = 'Check Form Details';
      }
    );
  }
}
