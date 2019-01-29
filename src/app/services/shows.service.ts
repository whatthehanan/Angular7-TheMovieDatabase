import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http: HttpClient) { }

  getShows() : Observable<response> {
    return this.http.get<response>(`https://api.themoviedb.org/3/discover/tv?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  }

  getShow(id) : Observable<show> {
    return this.http.get<show>(`http://api.themoviedb.org/3/tv/${id}?api_key=${environment.apiKey}&append_to_response=videos`);
  }
}

interface response {
  page : number,
  results : [show],
  total_results : number,
  total_pages : number
}

interface show {
  poster_path : string,
  overview : string,
  genre_ids : [number],
  id : number,
  original_language : string,
  name : string,
  original_name : string,
  backdrop_path : string,
  popularity : number,
  vote_count : number,
  video : boolean,
  vote_average : number,
  first_air_date : string,
  origin_country : [string],
}

