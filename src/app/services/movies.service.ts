import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() : Observable<response> {
    return this.http.get<response>(`https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  }

  getmovie(id) : Observable<movie> {
    return this.http.get<movie>(`http://api.themoviedb.org/3/movie/${id}?api_key=${environment.apiKey}&append_to_response=videos`);
  }
}


interface response {
  page : number,
  results : [movie],
  total_results : number,
  total_pages : number
}

interface movie {
  poster_path : string,
  adult : boolean,
  overview : string,
  release_date : string,
  genre_ids : [number],
  id : number,
  original_title : string,
  original_language : string,
  title : string,
  backdrop_path : string,
  popularity : number,
  vote_count : number,
  video : boolean,
  vote_average : number
}

