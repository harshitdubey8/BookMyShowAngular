import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Theater {
  _id: string;
  theatreName: string;
  theatreLocation: string;
  moviePrices: string;
}

interface FormData {
  [key: string]: string;
}

@Component({
  selector: 'app-admin-theater',
  templateUrl: './admin-theater.component.html',
  styleUrls: ['./admin-theater.component.css'],
})
export class AdminTheaterComponent implements OnInit {
  formData: FormData = {
    theatreName: '',
    theatreLocation: '',
    moviePrices: '',
  };

  allTheaters: Theater[] = [];
  result: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTheatreData();
  }

  handleChange(event: any): void {
    const { name, value } = event.target;
    this.formData[name] = value;
  }

  getTheatreData(): void {
    const url = 'http://localhost:80/api/theatre';
    this.http.get<Theater[]>(url).subscribe((data) => {
      this.allTheaters = data;
    });
  }

  addTheater(): void {
    if (
      !this.formData['theatreName'] ||
      !this.formData['theatreLocation'] ||
      !this.formData['moviePrices']
    ) {
      this.result = 'Please fill out all fields.';
      return;
    }

    const url = 'http://localhost:80/api/theatre';
    this.http.post<any>(url, this.formData).subscribe(
      (resData) => {
        if (resData.status === 'Record inserted in Database') {
          this.result = 'Theater added successfully';
          this.clearForm();
          this.getTheatreData();
        } else {
          this.result = 'Something went wrong';
        }
      },
      (error) => {
        console.error('Error during Adding the Theater:', error);
        this.result =
          'An error occurred during adding the Theater: ' + error.message;
      }
    );
  }

  deleteTheatre(theaterId: string): void {
    const flag = window.confirm('Are you sure want to delete?');
    if (!flag) {
      return;
    }

    const url = 'http://localhost:80/api/theatre/' + theaterId;
    this.http.delete<any>(url).subscribe(
      (resData) => {
        alert(resData.status);
        this.getTheatreData();
      },
      (error) => {
        console.error('Error during Deleting the Theater:', error);
      }
    );
  }

  clearForm(): void {
    this.formData = {
      theatreName: '',
      theatreLocation: '',
      moviePrices: '',
    };
  }
}
