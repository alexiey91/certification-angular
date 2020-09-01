import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class ZipcodeService {

  constructor() { }
  zipList  = new Subject<any>();

  insertZipCode(zipCode: string) : void {
    let list: string[] =  (!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [];
    list.push(zipCode);
    localStorage['zipCodeList'] = JSON.stringify(list);
    this.zipList.next(list);
  }

  getListZipCode(): Observable<string[]>{
    return of((!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [])
  }

  removeZipCode(zipCode: string) {
    let list: string[] =  (!! localStorage['zipCodeList']) ? JSON.parse(localStorage['zipCodeList']) : [];
    var index = list.indexOf(zipCode);
    list.splice(index, 1);
    //update current list on LocalStorage after delete
    localStorage['zipCodeList'] = JSON.stringify(list);
    this.zipList.next(list);
  }
}
