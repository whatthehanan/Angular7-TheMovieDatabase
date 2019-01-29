import { Component, OnInit } from '@angular/core';
import {ShowsService} from '../../services/shows.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  public showsData;
  public clickedShow;
  public videoId;
  public closeResult;

  constructor(private shows:ShowsService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.getShows();
  }

  async getShows(){
    await this.shows.getShows().subscribe(data => {
      this.showsData = data
      console.log(this.showsData.results);
    }); 
  }

  async showClicked(event,id){
    console.log('clicked:',id);
    await this.shows.getShow(id).subscribe(data => {
        this.clickedShow = data;
        console.log('clicked show data:',data);
        this.clickedShow.videos.results.forEach(({site,key,type}) => {
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
