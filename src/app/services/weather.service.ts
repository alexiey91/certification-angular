import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ZipcodeService } from './zipcode.service';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient, private zipcodeService: ZipcodeService) { }

  getWeatherList(list: string[]): Observable<any>{
    let getList: any[] = [];
    list.forEach( (value)=>{
      let url = "http://api.openweathermap.org/data/2.5/weather?zip="+value+",it&appid=5a4b2d457ecbef9eb2a71e480b947604"
      getList.push(this.http.get<any>(url).pipe(
        catchError((error: HttpErrorResponse) => {
         console.log("error",error.message,error.status);
         return of(null);
      })
      ))
    })
    return forkJoin(getList)
  }

  getWeather(zipCode: string): Observable<any>{
    let url = "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",it&appid=5a4b2d457ecbef9eb2a71e480b947604"

    return this.http.get<any>(url).pipe(
      map((data:any)=>{
          data.zipcode = zipCode;
          return data;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error",error.message,error.status);
        this.zipcodeService.removeZipCode(zipCode);

        return of({zipCode,error});
     })
    )
  }
}
