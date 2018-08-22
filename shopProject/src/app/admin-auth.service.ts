import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from "@angular/router";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AdminAuth {

  constructor(private router:Router) { }

canActivate(){
  var token = localStorage.getItem('token');
  if(token != null)
  {
    var jwt =new JwtHelperService();
    var decode = jwt.decodeToken(token);
    if(decode.auth != "Admin")
    {
      this.router.navigate(['/']);
      return false
    }
    else
    {
      return true;
    }
  }
  else
  {
    return false;
  }
}

}
