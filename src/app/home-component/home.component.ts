import { Component, OnInit } from '@angular/core';
import { ZipcodeService } from '../services/zipcode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**@internal */
  error: any = null;

  constructor(private zipcodeService: ZipcodeService) {
    this.zipcodeService.zipList.subscribe((zipCode: any) => {
      if(!!zipCode) this.error = null;
    })
   }

  ngOnInit() {
    
  }

  showErrorMessage(error: any){
    this.error = error;
  }

}
