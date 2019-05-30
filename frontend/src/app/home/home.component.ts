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
  private apikey = "/?apikey=34c602f9&s="
  private videoApiUrl = "http://www.omdbapi.com"
  private apiUrl = "localhost:3000/"

  public pages: any = [];
  public list: any = [];
  public movies: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    let str;
    let newStr: String = "";
    let format: String = "";
    let searchParam: String = "";

    if(this.search.includes(' ')){
      
      str = this.search.split(' ')

      for(let i = 0; i < str.length; i++){
        format += str[i] + '+'
      }
      newStr = format.substr(0, format.length - 1)
      // console.log(newStr.substr(0, newStr.length - 1))
      searchParam = newStr;
    } else {
      searchParam = this.search;
    }


    this.http.get(this.videoApiUrl + this.apikey + searchParam).subscribe((movies:any) => {

      this.list = movies.Search;
       
      let size = Math.ceil(movies.totalResults / 10);

      for (let i = 1; i <= size; i++){

        this.pages.push(i);
      }

    });

  }

  public onClick(e) {

    console.log(e.imdbID);

  }
}