import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../movie-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css',
})
export class HomeScreenComponent implements OnInit {
  movies: any[] = [];
  upcomingMovies: any[] = [];
  trendingMovies: any[] = [];
  recommendedMovies: any[] = [];

  constructor(private dataService: MovieDataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filterMovies();
    });
  }

  private filterMovies(): void {
    this.upcomingMovies = this.movies.filter(
      (movie) => movie.type === 'Upcoming'
    );
    this.trendingMovies = this.movies.filter(
      (movie) => movie.type === 'Trending'
    );
    this.recommendedMovies = this.movies.filter(
      (movie) => movie.type === 'Recommended'
    );
  }
}
