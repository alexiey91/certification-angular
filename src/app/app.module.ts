import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ZipcodeComponent } from './zipcode/zipcode.component';
import { ZipcodeService } from './services/zipcode.service';
import { CityComponent } from './city/city.component';
import { WeatherService } from './services/weather.service'
import { HttpClientModule } from '@angular/common/http';
import { TemperaturePipe } from './pipes/temperature.pipes';
import { WheatherForecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ZipcodeComponent,
    CityComponent,
    TemperaturePipe,
    WheatherForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers:  [ZipcodeService,WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
