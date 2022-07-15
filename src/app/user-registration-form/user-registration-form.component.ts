import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
 
  /**
   * registers a user to database
   * displays a message telling the user to have been successfully registered
   * @function userRegistration
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (r) => {
        this.dialogRef.close();
        console.log(r);
        this.snackBar.open('User registered successfully!!!','OK',{
          duration: 2000
        });
    } , 
    error: (e) => {
      console.log(e);
      this.snackBar.open(e, 'OK', {
        duration: 2000
      });
    }
  });
}
}
