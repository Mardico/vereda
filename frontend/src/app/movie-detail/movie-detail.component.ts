import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private route: ActivatedRoute
    ,private http: HttpClient
  ) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param:any) => {
      this.movie = "&t=" + param.params.movie;

      this.http.get(this.videoApiUrl + this.apikey + this.movie)
      .subscribe((movie:any) => {
        this.detail = movie;
        console.log(this.detail);
      });
    });
  }

}
