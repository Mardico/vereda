import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { WebService } from '../service/webservice';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: any;
  public detail: any = [];
  public rates: any = [1, 2, 3, 4, 5]
  public totalRate: any = [];
  public average: any;

  constructor(
    private route: ActivatedRoute
    ,private sanitizer : DomSanitizer
    ,private webservice: WebService
  ) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param:any) => {
      this.movie = "&t=" + param.params.movie;

      this.webservice.getMovie(this.movie).subscribe((movie:any) => {
        this.sanitizer.bypassSecurityTrustStyle(movie.Poster);
        this.detail = movie;

        this.getRate(movie.imdbID);
      });
    });
  }

  public getRate(param:any){

    this.webservice.getRate(param).subscribe((result:any) => {
     this.totalRate = result;
     let sum = 0;
     let average = 0;
     for(let i = 0; i < this.totalRate.length; i++) {
        sum += this.totalRate[i].rate;
        average = Math.ceil(sum / this.totalRate.length)
      }
      this.average = average
    })
  }

  public getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  public sendRate(id: any, r: any) {

    let param = {
      movie_id: id,
      rate: r
    }
    this.webservice.sendRate(param).subscribe(() => {});
  }

}
