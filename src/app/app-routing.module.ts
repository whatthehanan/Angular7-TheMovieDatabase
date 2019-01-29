import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MoviesComponent } from './components/movies/movies.component';
import {ShowsComponent} from './components/shows/shows.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { componentFactoryName } from '@angular/compiler';

const routes = [
  { path : '', redirectTo : '/movies' , pathMatch : 'full' },
  { path : 'movies', component : MoviesComponent },
  { path : 'shows', component : ShowsComponent },
  { path : "**", component : PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
export const routingComponents = [
  MoviesComponent,
  ShowsComponent,
  PageNotFoundComponent
];