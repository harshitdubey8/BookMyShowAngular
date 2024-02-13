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
  SearchValue: string = '';

  constructor(private dataService: MovieDataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filterMoviesByType();
    });
  }

  compareString = (string1 = '', string2 = '') =>
    string1?.toLowerCase?.()?.includes?.(string2?.toLowerCase?.());

  filterMovies = (movieType = '', movie: any, searchString = '') => {
    if (movie?.type !== movieType) {
      return false;
    }

    if (searchString) {
      return !!(
        this.compareString(movie?.movieTitle, searchString) ||
        this.compareString(movie?.movieDesc, searchString)
      );
    }
    return true;
  };

  private filterMoviesByType(searchString = ''): void {
    this.upcomingMovies = this.movies.filter((movie) =>
      this.filterMovies('Upcoming', movie, searchString)
    );
    this.trendingMovies = this.movies.filter((movie) =>
      this.filterMovies('Trending', movie, searchString)
    );
    this.recommendedMovies = this.movies.filter((movie) =>
      this.filterMovies('Recommended', movie, searchString)
    );
  }

  handleSearchChange(event: any): void {
    this.SearchValue = event.target.value;
    console.log(event.target.value);
    this.filterMoviesByType(event.target.value);
  }
}
