import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

//import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favs: any = null;
  favMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    
  }

   /**
   * calls API end-piont to get the user's data
   * @function getUser
   * @returns user's data in json format
   */
  getUser(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favMovies.push(movie);
              this.displayElement = true;
            }
          });
        });
      });
    }
  }

/**
   * opens the EditProfileComponent for a user to change their personal data
   */
  openEditProfileDialog(): void {
    this.dialogRef.open(EditProfileComponent, {
      width: '300px'
    })
  }

  /**
   * calls API end-point to remove a current logged in user from database
   * @function deleteUserProfile
   * @returns status for user has been removed
   */
 deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  /**
   * calls API end-point to remove a favorite movie of current logged in user from database
   * @param id { string }
   * @function removeFavoriteMovie
   * @returns status for favorite movie has been removed
   */

  removeFav(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.favs;
    });
  }

}
