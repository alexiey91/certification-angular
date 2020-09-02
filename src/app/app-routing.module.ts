import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WheatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { HomeComponent } from './home-component/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forecast/:zipcode', component:WheatherForecastComponent},
  { path: '**', redirectTo:"", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
