import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffe';
import { PlaceLocation } from './logic/PlaceLocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public endpoint: string = 'http://localhost:3000';
  public coffeeEntity = '/coffees';

  constructor(private httpClient: HttpClient) {
   }

  getList(callback: Function){
    this.httpClient.get(`${this.endpoint}${this.coffeeEntity}`).subscribe((response: any) => {
      callback(response);
    });
  }


  get(coffeId: string, callback: Function){
    this.httpClient.get(`${this.endpoint}${this.coffeeEntity}/${coffeId}`).subscribe((response: any) => {
      callback(response);
    });
  }

  save(coffee: any, callback: Function){
    if(coffee._id){
      //its an update
      this.httpClient.put(`${this.endpoint}${this.coffeeEntity}/${coffee._id}`, coffee).subscribe((response: any) => {
        callback(true);
      });
    }else{
      //its an insert
      this.httpClient.post(`${this.endpoint}${this.coffeeEntity}`, coffee).subscribe((response: any) => {
        callback(true);
      });
    }
  }
}
