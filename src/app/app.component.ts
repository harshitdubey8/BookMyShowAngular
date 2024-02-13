import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BookMyShow';

  user: any = {};
  userEmail: String | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('userEmail');
    this.getUserDetails(this.userEmail);
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
}
