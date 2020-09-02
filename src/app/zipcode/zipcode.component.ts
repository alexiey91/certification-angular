import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  @Output() showError: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(private zipCodeService: ZipcodeService) { 
    this.zipCodeService.alreadyExist.subscribe((exist: boolean) => {
      console.log("already exist", exist);
      this.showError.emit({message:"Zipcode alredy exist"})
    }) 
  }

  ngOnInit() {
 
  }

  onSubmit() {
    this.zipCodeService.insertZipCode(this.zipcode);
  }

}
