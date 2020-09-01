import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherList(list: string[]): Observable<any>{
    let getList: any[] = [];
    list.forEach( (value)=>{
      let url = "http://api.openweathermap.org/data/2.5/weather?zip="+value+",it&appid=5a4b2d457ecbef9eb2a71e480b947604"
      getList.push(this.http.get<any>(url))
    })
    return forkJoin(getList)
  }

}
