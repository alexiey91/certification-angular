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
  cityList: [];
  constructor(private weatherService: WeatherService, private zipcodeService: ZipcodeService) { 
    this.zipcodeService.zipList.subscribe((data: string[])=> {
      console.log("city Zip list",data);
      if(data.length > 0) this.weatherService.getWeatherList(data).subscribe((data: any)=> this.cityList = data)
    })
  }

  ngOnInit() {
    this.zipcodeService.getListZipCode().subscribe((lista: string[])=> {
      if(lista.length > 0) this.weatherService.getWeatherList(lista).subscribe((data: any)=> { 
        for( let i= 0; i< data.length ; i++) {
          data[i].zipcode = lista[i];
        }
        this.cityList = data 
        console.log(this.cityList) 
      })
    })
  }

  deleteCity(zipCode:string){
    this.zipcodeService.removeZipCode(zipCode);
  }

}
