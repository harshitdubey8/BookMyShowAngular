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
  searchValue: string = '';
  genre: string = '';

  constructor(private dataService: MovieDataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filterMoviesByType();
    });
  }

  compareString = (string1 = '', string2 = '') =>
    string1?.toLowerCase?.()?.includes?.(string2?.toLowerCase?.());

  filterMovies = (
    movieType = '',
    movie: any,
    searchString = '',
    genre = ''
  ) => {
    let matchesGenre = true; // By default genre matches

    if (genre) {
      matchesGenre = movie?.genre === genre;
    }
    if (movie?.type !== movieType) {
      return false;
    }

    if (searchString) {
      return !!(
        (this.compareString(movie?.movieTitle, searchString) ||
          this.compareString(movie?.movieDesc, searchString)) &&
        matchesGenre
      );
    }

    // If genre does not match and search string is also not there
    if (!matchesGenre) {
      return false;
    }
    return true;
  };

  private filterMoviesByType(searchString = '', genre = ''): void {
    this.upcomingMovies = this.movies.filter((movie) =>
      this.filterMovies('Upcoming', movie, searchString, genre)
    );
    this.trendingMovies = this.movies.filter((movie) =>
      this.filterMovies('Trending', movie, searchString, genre)
    );
    this.recommendedMovies = this.movies.filter((movie) =>
      this.filterMovies('Recommended', movie, searchString, genre)
    );
  }

  handleSearchChange(event: any): void {
    this.searchValue = event.target.value;

    this.filterMoviesByType(event.target.value, this.genre);
  }

  handleGenreChange(event: any): void {
    this.genre = event.target.value;

    this.filterMoviesByType(this.searchValue, event.target.value);
  }
}
