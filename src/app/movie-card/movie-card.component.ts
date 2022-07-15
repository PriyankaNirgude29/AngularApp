import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any[] = [];

  constructor(public fetchApiData: FetchApiDataService,
   public dialogRef: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
   
  }

   /**
   * uses API end-point to get a list of all movies in json format
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      }
    );
}

/**
   * gets the current logged in user's data
   * @function getUser
   * @returns the current logged in user's data
   */
getUser(): void {
  const username = localStorage.getItem('user');
  this.fetchApiData.getUser(username).subscribe((resp: any) => {
    this.currentUser = resp.Username;
    this.currentFavs = resp.FavoriteMovies;
  });
}
/**
   * opens the dialog to display the information from DirectorCardComponent
   * @param Name {string}
   * @param Bio {string}
   * @param Birth {string}
   */
openDirectorDialog(Name: string, Bio: string, Birth: Date): void {
  this.dialogRef.open(DirectorComponent, {
    data: {
      Name: Name,
      Bio: Bio,
      Birth: Birth,
    },
    // Assign dialog width
    width: '500px'
  });

}
/**
   * opens the dialog to display the information from GenreCardComponent
   * @param Name {string}
   * @param Description {string}
   */
openGenreDialog(Name: string, Description: string): void {
  this.dialogRef.open(GenreComponent, {
    data: {
      Name: Name,
      Description: Description,
    },
    // Assign dialog width
    width: '500px'
  });
}

/**
   * opens the dialog to display the information from SynopsisCardComponent
   * @param title {string}
   * @param description {string}
   */

openSynopsisDialog(title: string, description: string): void {
  this.dialogRef.open(SynopsisComponent, {
    data: {
      Title: title,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });

}

/**
   * gets the current favorite movie if exists
   * @param id { string }
   * @returns favorite movie if exists
   */

isFav(id: string): boolean {
  return this.currentFavs.includes(id);
}

/**
   * use API end-point to add a movie to user's favorites
   * @function addFavoriteMovie
   * @param id {string}
   * @returns an array of the movie object in json format
   */

addToFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}

 /**
   * user API end-point to remove a movie from user's favorites
   * @function deleteFavoriteMovie
   * @param id {string}
   * @returns updated user's data in json format
   */
removeFromFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}
}
