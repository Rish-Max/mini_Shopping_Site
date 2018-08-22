import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from "@angular/router";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

canActivate(route, state:RouterStateSnapshot ){
  var token = localStorage.getItem('token');
 if(token == null)
   {
   this.router.navigate(['/login'],{queryParams: {returnUrl: state.url }});
   return false;
   }
   else
   {
     return true;
   }

 }

}
