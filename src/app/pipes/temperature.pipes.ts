import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'temperature'})
export class TemperaturePipe implements PipeTransform {
    /**
     * 
     * @param value : value of Temperature
     * @param typeOfGraduation : C = Celsius, K = Kelvin, F = Farenhait
     */
  transform(value: string, typeOfGraduation?:string): string {
      //convert value like 290.66 into a number
      let numericValue = parseInt(value);
      let updatedValue = ""
        switch(typeOfGraduation){
            case "C":
                numericValue = numericValue - 273;
                updatedValue = ""+numericValue;
                break;
            case "F":
                numericValue = ((numericValue * 9)/ 5)- 459;
                updatedValue = ""+numericValue;
                break; 
            case "K":
            default:
                updatedValue = value;
                break
        }
    return updatedValue;
  }
}