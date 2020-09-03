import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class ZipcodeService {

  constructor() { }
  zipList  = new Subject<any>();
  alreadyExist: Subject<boolean> = new Subject<boolean>();

  /** Function that insert the zipcode inside the localstorage and check if exist. If not emit an error */
  insertZipCode(zipCode: string) : void {
    let list: string[] =  (!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [];
      if(list.includes(zipCode)){
        this.alreadyExist.next(true);
      }else{
        list.push(zipCode);
        localStorage['zipCodeList'] = JSON.stringify(list);
        this.zipList.next({zipCode, delete:false});
      }    
  }

  /** Function that return the list of all zipcode inside the localstorage */
  getListZipCode(): Observable<string[]>{
    return of((!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [])
  }

  /** Function that delete element form list of zipCode inside the localstorage List */
  removeZipCode(zipCode: string) {
    let list: string[] =  (!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [];
    var index = list.indexOf(zipCode);
    list.splice(index, 1);
    //update current list on LocalStorage after delete
    localStorage['zipCodeList'] = JSON.stringify(list);
    this.zipList.next({zipCode,delete:true});
  }
}
