import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  private apikey = "/?apikey=34c602f9&"
  private videoApiUrl = "http://www.omdbapi.com"
  private apiUrl = "localhost:3000/"

  public movie: any;
  public detail: any = [];
  public rates: any = [1, 2, 3, 4, 5]

  constructor(
    private route: ActivatedRoute
    ,private http: HttpClient
    ,private sanitizer : DomSanitizer
  ) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param:any) => {
      this.movie = "&t=" + param.params.movie;

      this.http.get(this.videoApiUrl + this.apikey + this.movie)
      .subscribe((movie:any) => {
        this.sanitizer.bypassSecurityTrustStyle(movie.Poster);
        this.detail = movie;


        console.log(this.detail);
      });
    });
  }

  public getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  public sendRate(e, i) {
    console.log(e, i);
  }

}
