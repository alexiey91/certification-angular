import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ZipcodeService } from '../services/zipcode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  /**@internal */
  cityList: any[] = [];
  /**@internal */
  type: "C" | "F" | "K" = "C";

  @Output() showError: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private weatherService: WeatherService, private zipcodeService: ZipcodeService, private router: Router, private route: ActivatedRoute) {
    this.zipcodeService.zipList.subscribe((zipCode: any) => {
      console.log("city Zipcode added", zipCode);
      if (zipCode && zipCode.delete) {
          this.cityList = this.cityList.filter(element => element.zipcode != zipCode.zipCode);
      } else {
        this.weatherService.getWeather(zipCode.zipCode).subscribe((data: any) => {
          if (!!data && !!data.error) {
            console.log(data);
            this.showError.emit(data.error);
          } else {
            this.cityList.push(data)
          }
          console.log("cityList after update", this.cityList)
        });
      }
    })
  }

  ngOnInit() {
    this.zipcodeService.getListZipCode().subscribe((lista: string[]) => {
      if (lista.length > 0) this.weatherService.getWeatherList(lista).subscribe((data: any) => {
        this.cityList = this.addZipCode(data, lista);
        console.log("lista city ", this.cityList)
      })
    })
  }

  addZipCode(data: any, zipCodeList: string[]): any {
    let resultList: any = [];
    for (let i = 0; i < data.length; i++) {
      if (!!data[i]) {
        data[i].zipcode = zipCodeList[i];
        resultList.push(data[i]);
      }
    }
    return resultList;
  }

  deleteCity(zipCode: string) {
    this.zipcodeService.removeZipCode(zipCode);
  }

}
