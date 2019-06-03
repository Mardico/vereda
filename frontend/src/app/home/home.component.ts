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
  public page: any;
  public list: any = [];
  public movies: any = [];
  public movie: string;

  public active: boolean = false;
  public pageActive: any;
  public actualPageIndex: any;
  public noImage: boolean = false;
  public isValid: Boolean = true;
  public searchType: string = "Movie"
  public typeParam: string = "&type=movie";

  public isAvenger          :boolean = false;
  public wantSpoiler        :boolean = false;
  public reallyWantSpoiler  :boolean = false;

  constructor(
    private router: Router
    ,private webservice: WebService
  ) { }

  ngOnInit() {
    this.active = false;
    this.pageActive = ""
  }

  public onSubmit() {
    let str;
    let format: string = "";
    this.pages = [];

    if(this.search != "" && this.search != null && typeof this.search != undefined) {
      this.isValid = true;
      this.active = true;
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
    } else {
      this.isValid = false;
    }

    if(this.newStr.includes("avenger")){
      this.isAvenger = true;
    }
  }

  public isAvg() {
    this.wantSpoiler = true;
  }

  public showSpoiler() {
    this.reallyWantSpoiler = true;
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
    // let urlParam: string = "";

    if(e.Title.includes(" ")) {
      let split = title.split(" ");

      for(let i = 0; i < split.length; i++) {
        param += split[i] + '+';
      }

      this.movie = param.substr(0, param.length - 1);

    } else {this.movie = title}

      this.router.navigateByUrl(this.detailPage + this.movie);
  }

  public paginate(e) {
    this.page = "&page=" + e

    this.actualPageIndex = e;
    this.webservice.paginate(this.newStr + this.page).subscribe((movies:any) => {
      this.list = movies.Search;
    });
  }
}