import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MoviesComponent } from './components/movies/movies.component';
import {ShowsComponent} from './components/shows/shows.component';
import { componentFactoryName } from '@angular/compiler';

const routes = [
  { path : '', component : MoviesComponent },
  { path : 'shows', component : ShowsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
