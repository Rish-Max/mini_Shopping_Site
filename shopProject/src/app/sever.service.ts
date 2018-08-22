import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Routes} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: Http) { }

 login(user)
 {
   return this.http.post('http://localhost:3000/user/login',user);
 }
 signUp(user)
 {
  return this.http.post('http://localhost:3000/user/signup',user);
 }
 

}
