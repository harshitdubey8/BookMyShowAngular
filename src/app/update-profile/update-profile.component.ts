import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  user: any = {};
  formData: any = {
    username: '',
    profilePicUrl: '',
    phoneNo: '',
  };
  userEmail: String | null = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('userEmail');
    this.getUserDetails(this.userEmail);
  }
  handleChange(event: any): void {
    const { name, value } = event.target;
    this.formData[name] = value;
  }

  // Get user Details
  getUserDetails(email: any): void {
    if (!email) {
      return;
    }
    const url = `http://localhost:80/api/user/${email}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  setUserDetails(): void {
    this.formData = {
      username: this.user?.username,
      profilePicUrl: this.user?.profilePicUrl,
      phoneNo: this.user?.phoneNo,
    };
  }

  updateUserData(): void {
    const url = `http://localhost:80/api/user/${this.user?._id}`;

    this.http.put(url, this.formData).subscribe(
      (resData: any) => {
        alert(resData.message);
      },
      (error) => {
        console.error('Error during updating the user:', error);
        this.error =
          'An error occurred during updating the user: ' + error.message;
      }
    );
  }
}
