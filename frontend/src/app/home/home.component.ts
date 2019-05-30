import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public search: String;
  private apikey = "/?apikey=34c602f9&"
  private videoApiUrl = "http://www.omdbapi.com"
  private apiUrl = "localhost:3000/"
  
  public newStr: String = "";
  public pages: any = [];
  public list: any = [];
  public movies: any = [];

  public isValid: Boolean = true;
  public searchType: String = "Movie"
  public typeParam: String = "type=movie";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    let str;
    let format: String = "";

    if(this.search != "" && this.search != null && typeof this.search != undefined) {

      this.isValid = true;
      if(this.search.includes(' ')){
        str = this.search.split(' ')
  
        for(let i = 0; i < str.length; i++){
          format += str[i] + '+'
        }
        this.newStr = '&s=' + format.substr(0, format.length - 1)
        // console.log(this.newStr.substr(0, this.newStr.length - 1))
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
      console.log(this.isValid)
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

  public onClick(e) {
    console.log(e.imdbID);
  }

  public paginate(e) {
    let page = "&page=" + e

    this.http.get(this.videoApiUrl + this.apikey + this.typeParam + this.newStr + page).subscribe((movies:any) => {

      this.list = movies.Search;
    });
  }
}