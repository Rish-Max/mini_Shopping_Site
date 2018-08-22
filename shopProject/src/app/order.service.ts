import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class orderService {

constructor(private http:Http){}

 addOrder(shipping){
   return this.http.post("http://localhost:3000/order/addOrder",{shipping : shipping});
 }

 checkOrder(id){
  return this.http.get("http://localhost:3000/order/view/"+id);   
 }

 userOrder(){
   var userToken = localStorage.getItem('token');
   return  this.http.get("http://localhost:3000/order/show/"+userToken); 
 }


 adminOrder(){
  return  this.http.get("http://localhost:3000/order/viewAll");
 }
}
