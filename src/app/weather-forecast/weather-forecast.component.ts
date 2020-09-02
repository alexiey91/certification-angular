import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ZipcodeService } from '../services/zipcode.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-wheater-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WheatherForecastComponent implements OnInit {
  zipCode: string = null;
  /**@internal */
  foreCastData: any = null;
  
  /**@internal */
  type: "C" | "F" | "K" = "C";
  constructor(private weatherService: WeatherService, private zipcodeService: ZipcodeService,private route: ActivatedRoute, private router: Router) { 
  
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.zipCode = params['zipcode'];
          //call service
          console.log("router",params)
          this.weatherService.getForecastData(this.zipCode).subscribe((foreCastData: any)=>{
            console.log(foreCastData);
            if(foreCastData) this.foreCastData = foreCastData;
          })
        }
      );
  }

  back(){
    this.router.navigate([''], {relativeTo: this.route});
  }
  
}
