import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ZipcodeService } from '../services/zipcode.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  /**@internal */
  cityList: any[];
  /**@internal */
  type : "C" | "F" | "K" = "C";

  constructor(private weatherService: WeatherService, private zipcodeService: ZipcodeService) { 
    this.zipcodeService.zipList.subscribe((zipCode: any)=> {
      console.log("city Zipcode added",zipCode);
      if(zipCode && zipCode.delete ){
        var index =  this.cityList.indexOf(zipCode);
        this.cityList.splice(index, 1);
      } else{
        this.weatherService.getWeather(zipCode).subscribe((data: any)=>{ 
          if(!!data && !!data.error){
            console.log(data);
            alert("Attention the zipcode insered does not exist");
          }else{
            this.cityList.push(data)
          }
        console.log("cityList after update",this.cityList)
      });
    }
    })
  }

  ngOnInit() {
    this.zipcodeService.getListZipCode().subscribe((lista: string[])=> {
      if(lista.length > 0) this.weatherService.getWeatherList(lista).subscribe((data: any)=> { 
        this.cityList = this.addZipCode(data, lista); 
        console.log("lista city ",this.cityList) 
      })
    })
  }

  addZipCode(data:any, zipCodeList: string[]): any{
    let resultList: any = [];
    for( let i= 0; i< data.length ; i++) {
      if( !!data[i]) {
        data[i].zipcode = zipCodeList[i];
        resultList.push(data[i]);
      }
    }
    return resultList;
  }

  deleteCity(zipCode:string){
    this.zipcodeService.removeZipCode(zipCode);
  }

}
