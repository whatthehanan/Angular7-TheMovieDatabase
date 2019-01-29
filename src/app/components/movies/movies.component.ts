import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import { map, subscribeOn } from 'rxjs/operators';
import { ConcatSource } from 'webpack-sources';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public moviesData;
  public clickedMovie;
  closeResult: string;
  public videoId: string;

  constructor(private movies : MoviesService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer
    ) { }

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
        this.clickedMovie.videos.results.forEach(({site,key,type}) => {
            if(site === 'YouTube' && type === 'Trailer' )
                this.videoId = key;
                // 'https://www.youtube.com/embed/'+
            // console.log(this.videoId);
        });
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
