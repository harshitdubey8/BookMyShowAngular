// movie-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDataService } from '../movie-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface Movie {
  _id: string;
  movieTitle: string;
  movieDesc: string;
  genre: string;
  duration: number;
  releaseDate: string;
  posterUrl: string;
  type: string;
  rating: number;
  cast: string[];
}

interface Theatre {
  _id: string;
  theatreName: string;
  theatreLocation: string;
  moviePrices: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId: string = '';
  movieData: Movie | null = null;
  reviews: any[] = [];
  theatreData: any[] = [];
  selectedTheatreData: Theatre | null = null;
  isModalOpen: boolean = false;
  ticketCount: number = 1;
  user: any = {};
  userEmail: String | null = null;

  reviewMessage: String = '';
  reviewRating: String = '';
  reviewResult: String = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: MovieDataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];

      this.getMovieDetails(params['id']);
      this.getMovieReviews(params['id']);
      this.getTheatreData();

      this.userEmail = sessionStorage.getItem('userEmail');
      this.getUserDetails(this.userEmail);
    });
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

  // Get Movie Details
  private getMovieDetails(id: string): void {
    // Fetch movie data only after movieId is retrieved
    this.dataService.getMovieById(id).subscribe((data: Movie) => {
      this.movieData = data;
    });
  }
  private getMovieReviews(id: string): void {
    // Fetch movie data only after movieId is retrieved
    this.dataService.getMovieReviewsById(id).subscribe((data) => {
      this.reviews = data;
      console.log(this.reviews);
    });
  }

  // Get All theatres
  getTheatreData(): void {
    this.dataService.getTheatreData().subscribe(
      (resData: any) => {
        this.theatreData = resData;
      },
      (error) => {
        console.error('Error fetching theatre data:', error);
      }
    );
  }

  // Selected theatre Data
  selectedTheatreDetails(data: any): void {
    this.selectedTheatreData = data;
    this.isModalOpen = true;
    console.log(this.selectedTheatreData);
  }

  handleTicketCountChange(event: any): void {
    this.ticketCount = event.target.value;
  }

  // Method to parse string to float
  parseToFloat(value: string): number {
    return parseFloat(value);
  }

  // To Cancel Booking
  onCancel(): void {
    this.isModalOpen = false;
    this.ticketCount = 0;
  }

  // Booking
  OnBookingConfirm() {
    let bookingObj = {
      userId: this.user._id, // Make sure userData is available in your component
      movieId: this.movieData?._id, // Make sure movie is available in your component
      theatreId: this.selectedTheatreData?._id, // Make sure selectedTheatre is available in your component
      seats: this.ticketCount, // Make sure ticketCount is available in your component
      grandTotal:
        (this.selectedTheatreData?.moviePrices
          ? this.parseToFloat(this.selectedTheatreData?.moviePrices)
          : 0) * this.ticketCount, // Make sure selectedTheatre.moviePrices is available in your component
    };

    try {
      this.dataService.createBooking(bookingObj).subscribe(() => {
        this.router.navigate(['/success']);
      });
    } catch (error) {
      console.error('Error during Booking:', error);
      // Handle error
    }
  }

  handleReviewRatingChange(event: any): void {
    this.reviewRating = event.target.value;
  }
  handleReviewMessageChange(event: any): void {
    this.reviewMessage = event.target.value;
  }

  addReview(): void {
    const reviewObj = {
      message: this.reviewMessage,
      userRating: this.reviewRating,
      userId: this.user._id,
      movieId: this.movieData?._id,
    };

    this.dataService.addReview(reviewObj).subscribe(
      () => {
        this.reviewResult = 'Review added successfully';
      },
      (error) => {
        console.error('Error during adding the review:', error);
        this.reviewResult =
          'An error occurred during adding the review: ' + error.message;
      }
    );
  }
}
