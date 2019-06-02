import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebService } from '../service/webservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public search: string;
  private detailPage = "/detail/"
  
  public newStr: string = "";
  public pages: any = [];
  public list: any = [];
  public movies: any = [];
  public movie: string;

  public active: any;
  public pageActive: any;
  public noImage: boolean = false;
  public isValid: Boolean = true;
  public searchType: string = "Movie"
  public typeParam: string = "&type=movie";

  constructor(
    private http: HttpClient
    ,private router: Router
    ,private webservice: WebService
  ) { }

  ngOnInit() {
    this.active = ""
    this.pageActive = ""
  }

  public onSubmit() {
    let str;
    let format: string = "";
    this.pages = [];

    if(this.search != "" && this.search != null && typeof this.search != undefined) {

      this.isValid = true;
      if(this.search.includes(' ')){
        str = this.search.split(' ')
  
        for(let i = 0; i < str.length; i++){
          format += str[i] + '+'
        }
        this.newStr = this.typeParam + '&s=' + format.substr(0, format.length - 1)
      } else {
        this.newStr = this.typeParam + '&s=' + this.search;
      }
 
      this.webservice.listMovies(this.newStr).subscribe((movies:any) => {
        this.list = movies.Search

        let size = 0;
        size = Math.ceil(movies.totalResults / 10);
        for (let i = 1; i <= size; i++){
          this.pages.push(i);
        }
      });
      // this.http.get(this.videoApiUrl + this.apikey + this.typeParam + this.newStr)
      //   .subscribe((movies:any) => {
      //   this.list = movies.Search;
      // });
    } else {
      this.isValid = false;
    }
  }

  public changeSearchType(){

    if(this.searchType == "Movie") {
      this.searchType = "TV Show";
      this.typeParam = "&type=series"
    } else {
      this.searchType = "Movie";
      this.typeParam = "&type=movie"
    }
  }

  public getMovie(e) {

    let title: string = e.Title;
    let param: string = "";
    let urlParam: string = "";

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

    this.webservice.paginate(this.typeParam + this.newStr + page).subscribe((movies:any) => {
      this.list = movies.Search;
    });
  }

  public activeSearch() {
    this.active = "active"
  }
}