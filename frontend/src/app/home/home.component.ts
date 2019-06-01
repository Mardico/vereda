import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public search: String;
  private apikey = "/?apikey=34c602f9&"
  private videoApiUrl = "http://www.omdbapi.com"
  private detailPage = "/detail/"
  
  public newStr: String = "";
  public pages: any = [];
  public list: any = [];
  public movies: any = [];
  public movie: String;

  public active: any;
  public pageActive: any;
  public noImage: boolean = false;
  public isValid: Boolean = true;
  public searchType: String = "Movie"
  public typeParam: String = "type=movie";

  constructor(
    private http: HttpClient
    ,private router: Router
  ) { }

  ngOnInit() {
    this.active = ""
    this.pageActive = ""
  }

  public onSubmit() {
    let str;
    let format: String = "";
    this.pages = [];

    if(this.search != "" && this.search != null && typeof this.search != undefined) {

      this.isValid = true;
      if(this.search.includes(' ')){
        str = this.search.split(' ')
  
        for(let i = 0; i < str.length; i++){
          format += str[i] + '+'
        }
        this.newStr = '&s=' + format.substr(0, format.length - 1)
      } else {
        this.newStr = '&s=' + this.search;
      }
 
      this.http.get(this.videoApiUrl + this.apikey + this.typeParam + this.newStr).subscribe((movies:any) => {
        this.list = movies.Search;

        let size = 0;
        size = Math.ceil(movies.totalResults / 10);
        for (let i = 1; i <= size; i++){
          this.pages.push(i);
        }
      });
    } else {
      this.isValid = false;
    }
  }

  public changeSearchType(){

    if(this.searchType == "Movie") {
      this.searchType = "TV Show";
      this.typeParam = "type=series"
    } else {
      this.searchType = "Movie";
      this.typeParam = "type=movie"
    }
  }

  public getMovie(e) {

    let title: String = e.Title;
    let param: String = "";
    let urlParam: String = "";

    // console.log(title);

    if(e.Title.includes(" ")) {
      let split = title.split(" ");

      for(let i = 0; i < split.length; i++) {
        param += split[i] + '+';
      }

      this.movie = param.substr(0, param.length - 1);

    } else {this.movie = urlParam}

      this.router.navigateByUrl(this.detailPage + this.movie);
  }

  public paginate(e) {
    let page = "&page=" + e

    this.http.get(this.videoApiUrl + this.apikey + this.typeParam + this.newStr + page).subscribe((movies:any) => {
      this.list = movies.Search;
    });
  }

  public activeSearch() {
    this.active = "active"
  }
}