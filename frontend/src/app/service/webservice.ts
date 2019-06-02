import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient){}

  private videoApi = "http://www.omdbapi.com";
  public api = "http://localhost:3000/";
  
  private apikey = "/?apikey=34c602f9";

  // VIDEOS ROUTES
  getMovie(param:any){
    return this.http.get(this.videoApi + this.apikey + param);
  }

  listMovies(param: any){
    return this.http.get(this.videoApi + this.apikey + param);
  }

  paginate(param:any) {
    return this.http.get(this.videoApi + this.apikey + param);
  }

  //NODE API
  sendRate(param){
    console.log(this.api + "api/movie/rate")
    return this.http.post(this.api, param)
    .pipe(
      map((response:Response) => {

      })
    )
  }

  getRate(param){
    return this.http.post(this.api + "api/rate", param)
    .pipe(
      map((response:Response) => {
        console.log(response);
      })
    )
  }

}