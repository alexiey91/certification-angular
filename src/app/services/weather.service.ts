import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, Subject } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';


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

        return of({zipCode,error:error.error});
     })
    )
  }

  getForecastData(zipcode:string): Observable<any>{
    let url = "http://api.openweathermap.org/data/2.5/forecast/daily?zip="+zipcode+",it&appid=5a4b2d457ecbef9eb2a71e480b947604"
    
    return this.http.get<any>(url).pipe(
      switchMap((data: any)=>{
        data.list.forEach(element => {
            element.dt = new Date(element.dt* 1000);
        });
        return of(data);
      }),
      switchMap((data:any)=>{
       data.list.sort((a, b) => a.dt.getTime() - b.dt.getTime())
      
       return of(data);
      }),
        // filter(one => one.list.dt >= dateMin.setDate(dateMin.getDate() + 1) && dateMax.setDate(dateMax.getDate() + 5))),
      
      catchError((error: HttpErrorResponse) => {
        console.log("error",error.message,error.status);
      
        return of(null);
     })
    )
  }

}
