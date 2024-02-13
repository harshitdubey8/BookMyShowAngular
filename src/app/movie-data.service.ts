import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  constructor(private http: HttpClient) {}

  // get All movies
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:80/api/movies');
  }

  // get single movie based on id
  getMovieById(movieId: string): Observable<any> {
    return this.http.get<any>('http://localhost:80/api/movies/' + movieId);
  }

  // Get movie reviews based on movie ID
  getMovieReviewsById(movieId: string): Observable<any[]> {
    console.log(movieId);
    return this.http.get<any[]>(`http://localhost:80/api/reviews/${movieId}`);
  }

  // add a movie
  addMovie(formData: any): Observable<any> {
    return this.http.post<any>('http://localhost:80/api/movies', formData);
  }

  updateMovie(url: string, updateForm: any): Observable<any> {
    return this.http.put<any>(url, updateForm);
  }

  // Delete movie
  deleteMovie(movieId: string): Observable<any> {
    const url = `http://localhost:80/api/movies/${movieId}`;
    return this.http.delete(url);
  }

  getTheatreData(): Observable<any> {
    return this.http.get<any>('http://localhost:80/api/theatre');
  }

  // Confirm Booking

  createBooking(bookingObj: any) {
    const url = 'http://localhost:80/api/bookings';
    return this.http.post(url, bookingObj);
  }

  // Add a review
  addReview(reviewObj: any): Observable<any> {
    const url = `http://localhost:80/api/reviews/add`;
    return this.http.post(url, reviewObj);
  }
}
