import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  public getMovie(param:any){
    return this.http.get(this.videoApi + this.apikey + param);
  }

  public listMovies(param: any){
    return this.http.get(this.videoApi + this.apikey + param);
  }

  public paginate(param:any) {
    return this.http.get(this.videoApi + this.apikey + param);
  }

  //NODE API
  public getRate(param: any){
    return this.http.get(this.api + "api/rate",  { params:{_id: param}})
  }

  public sendRate(param: any){
    return this.http.post(this.api + "api/movie/rate", param)
    .pipe(
      map((response:Response) => {

      })
    )
  }
}