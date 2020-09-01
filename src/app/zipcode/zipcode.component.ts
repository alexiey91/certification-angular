import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ZipcodeService } from '../services/zipcode.service';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.css']
})
export class ZipcodeComponent implements OnInit {
 
  @ViewChild('form', { static: false }) form: NgForm;
  /** @internal */
  zipcode: string = null;

  constructor(private zipCodeService: ZipcodeService) { 
    this.zipCodeService.zipList.subscribe((list: string[]) => {
      console.log("zipCode Subject List" ,list)
    }) 
  }

  ngOnInit() {
   this.zipCodeService.getListZipCode().subscribe((list: string[]) => {
     console.log("zipCode List" ,list)
   }) 
  }

  onSubmit() {
    this.zipCodeService.insertZipCode(this.zipcode);
  }

}
