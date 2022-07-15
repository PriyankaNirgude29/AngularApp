# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Description

The aim of this project is to build the client-side for an application called myFlix using Angular based on its existing server-side code (REST API and database), with supporting documentation.

## User Stories

* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am  interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features

* Welcome view where users are able to either log in or register an account
* Upon authentication, display a view of all Movies
* Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed. 
* The single movie view will contain the following additional features:
      * A button that when clicked takes a user to the ​director view,​ where details about the director of that particular movie will be displayed.
      * A button that when clicked takes a user to the ​genre view,​ where details about that particular genre of the movie will be displayed.

## Development Process for the movies application

* Install Angular
  1. Check if Angular is already installed on device

     ng --version

  2. If not, install Angular

     npm install -g @angular/cli

* Create a new Angular project
  1. Navigate to folder and create project
     
     ng new my-projec-name

  2. Navigate to project folder to run project

     ng serve --open

* Set up app to load data from movie API
  1. Set up Angular HttpClient 
     1.1 Go to app.module.ts and add
         import { HttpClientModule } from '@angular/common/http';

     1.2. Add HttpClientModule to the imports of @NgModule

  2. Create Angular Service for Consuming REST API 
     2.1 Create a new Service inside app folder

      ng generate service fetch-api-data

     2.2. Add import statements to fetch-api-data.service.ts file

          import { catchError } from 'rxjs/internal/operators';
          import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
          import { Observable, throwError } from 'rxjs';
          import { map } from 'rxjs/operators';

  3. Implement services logic to make API calls
        
        * User registration
        * User login
        * Get all movies
        * Get one movie
        * Get director
        * Get genre
        * Get user
        * Get favourite movies for a user
        * Add a movie to favourite Movies
        * Edit user
        * Delete user and
        * Delete a movie from the favorite movies

## Add Angular Material to application

* Install project dependency

   ng add @angular/material

* Import models from Angular Material to app.module.ts

* Add modules to imports array to serve to other components

## Create components for user to use application
   
   * Using the command:

          ng generate component my-component-name

   * Structure of components:

       * Welcome screen
            * User registration form 
            * User login form
       * Navbar
       * Movie Card View
       * Dialogs for Movie Card:
            * Director
            * Genre
            * Synopsis
       * Profile View
            * Edit profile dialog

## Add routing to application

1. Import Angular's built-in router:
import { RouterModule, Routes } from '@angular/router';

2. Add to app.component.html
<router-outlet></router-outlet> 

3. Create routes in app.module.ts

## Deploy to GitHub Pages

1. Create a GitHub repository for your project.

2. Configure git in your local project by adding a remote that specifies the GitHub repository you created in previous step.GitHub provides these commands when you create the repository so that you can copy and paste them at your command prompt.

     git remote add origin https://github.com/your-username/your-project-name.git
     git branch -M main
     git push -u origin main

3. Create and check out a git branch named gh-pages.

    git checkout -b gh-pages

4. Build your project using the Github project name, with the Angular CLI command ng build and the following options, where your_project_name is the name of the project that you gave the GitHub repository in step 1.

    ng build --output-path docs --base-href /your_project_name/

5. When the build is complete, make a copy of docs/index.html and name it docs/404.html.

6. Commit your changes and push.

7. On the GitHub project page, go to Settings and scroll down to the GitHub Pages section to configure the site to publish from the docs folder.

8. Click Save.

9. Click on the GitHub Pages link at the top of the GitHub Pages section to see your deployed application. The format of the link is https://<user_name>.github.io/<project_name>.

## Add TypeDoc Documentation

* Install typedoc (if not yet installed):
    
    npm install typedoc

* Check that code is commented adhering to best practices

* Run typedoc to create documentation:

    typedoc --entryPointStrategy expand ./src
   
