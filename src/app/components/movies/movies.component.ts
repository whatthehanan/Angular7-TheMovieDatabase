import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import { map, subscribeOn } from 'rxjs/operators';
import { ConcatSource } from 'webpack-sources';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public moviesData;
  public clickedMovie;

  constructor(private movies : MoviesService) { }

  ngOnInit() {
      this.getmovies();
  }

  async getmovies(){
    await this.movies.getMovies().subscribe(data => {
      this.moviesData = data
    }); 
  }

  async movieClicked(event,id){
    console.log('clicked:',id);
    await this.movies.getmovie(id).subscribe(data => {
        this.clickedMovie = data;
        console.log('clicked Movie data:',data);
    })
  }

}
