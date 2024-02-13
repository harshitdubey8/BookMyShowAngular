import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  formData: any = {
    movieTitle: '',
    movieDesc: '',
    genre: '',
    duration: '',
    releaseDate: '',
    posterUrl: '',
    type: '',
    rating: '',
  };

  updateForm: any = {
    movieTitle: '',
    movieDesc: '',
    genre: '',
    duration: '',
    releaseDate: '',
    posterUrl: '',
    type: '',
    rating: '',
  };

  allMovies: any[] = [];
  result: string = '';
  updateId: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private dataService: MovieDataService
  ) {}

  ngOnInit(): void {
    this.getMovieData();
  }

  handleChange(event: any): void {
    const { name, value } = event.target;
    this.formData[name] = value;
  }

  updateHandleChange(event: any): void {
    const { name, value } = event.target;
    this.updateForm[name] = value;
  }

  getMovieData(): void {
    this.dataService.getMovies().subscribe((data) => {
      this.allMovies = data;
    });
  }

  addMovie(): void {
    if (
      !this.formData.movieTitle ||
      !this.formData.genre ||
      !this.formData.duration ||
      !this.formData.releaseDate ||
      !this.formData.posterUrl ||
      !this.formData.type ||
      !this.formData.rating
    ) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.dataService.addMovie(this.formData).subscribe(
      (resData: any) => {
        console.log(resData);
        if (resData.status === 'Record inserted in Database') {
          // Reset form
          this.formData = {
            movieTitle: '',
            movieDesc: '',
            genre: '',
            duration: '',
            releaseDate: '',
            posterUrl: '',
            rating: '',
            type: '',
          };
          this.errorMessage = ''; // Clear any previous error messages
        } else {
          this.errorMessage = 'Something went wrong';
        }
      },
      (error) => {
        console.error('Error during Adding the Movie:', error);
        this.errorMessage =
          'An error occurred during adding the movie: ' + error.message;
      }
    );
  }

  editMovieButton(dno: string): void {
    const movieObj = this.allMovies.find((item) => item._id === dno);
    if (movieObj) {
      this.updateId = dno;
      this.updateForm = {
        movieTitle: movieObj.movieTitle,
        movieDesc: movieObj.movieDesc,
        genre: movieObj.genre,
        duration: movieObj.duration,
        releaseDate: movieObj.releaseDate,
        posterUrl: movieObj.posterUrl,
        type: movieObj.type,
        rating: movieObj.rating,
      };
    } else {
      console.error('Movie not found');
    }
  }

  updateMovie(): void {
    // Check if any required fields are empty
    if (
      !this.updateForm.movieTitle ||
      !this.updateForm.genre ||
      !this.updateForm.duration ||
      !this.updateForm.releaseDate ||
      !this.updateForm.posterUrl ||
      !this.updateForm.type ||
      !this.updateForm.rating
    ) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    const url = `http://localhost:80/api/movies/${this.updateId}`;
    this.dataService.updateMovie(url, this.updateForm).subscribe(
      (resData: any) => {
        console.log(resData);
        alert(resData.message); // Assuming your API returns a message
        // Clear form and error message
        this.clearForm();
      },
      (error) => {
        console.error('Error during updating the movie:', error);
        this.errorMessage =
          'An error occurred during updating the movie: ' + error.message;
      }
    );
  }

  clearForm(): void {
    this.formData = {
      movieTitle: '',
      movieDesc: '',
      genre: '',
      duration: '',
      releaseDate: '',
      posterUrl: '',
      type: '',
      rating: '',
    };
    this.updateForm = {
      movieTitle: '',
      movieDesc: '',
      genre: '',
      duration: '',
      releaseDate: '',
      posterUrl: '',
      type: '',
      rating: '',
    };
  }

  deleteMovie(dno: string): void {
    const flag = window.confirm('Are you sure want to delete?');
    if (!flag) {
      return;
    }

    this.dataService.deleteMovie(dno).subscribe(
      (resData: any) => {
        alert(resData.status);
        // Assuming you have a method to refresh movie data
        this.getMovieData();
        this.errorMessage = ''; // Clear error message on success
      },
      (error) => {
        console.error('Error during deleting movie:', error);
        this.errorMessage = 'An error occurred while deleting the movie.'; // Set error message
      }
    );
  }
}
