import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ZipcodeService } from '../services/zipcode.service';

@Component({
  selector: 'app-wheater-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WheatherForecastComponent implements OnInit {
  

  constructor(private weatherService: WeatherService, private zipcodeService: ZipcodeService) { 
  
  }

  ngOnInit() {
 
  }

  
}
