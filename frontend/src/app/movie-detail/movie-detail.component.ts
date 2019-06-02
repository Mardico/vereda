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

  constructor(
    private route: ActivatedRoute
    ,private http: HttpClient
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

        this.getRate(this.detail.imdbID);
      });
    });
  }

  public getRate(param){
    this.webservice.getRate({_id: param}).subscribe(() => {})
  }

  public getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  public sendRate(id: any, r: any) {

    let param = {
      movie_id: id,
      rate: r
    }
    console.log(param);

    this.webservice.sendRate(param)
    .subscribe(() => {
    })

    // return this.http.post(this.apiUrl, param)
    // .pipe(
    //   map((response:Response) => {

    //   })
  }

}
