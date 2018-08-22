import { Component, OnInit, DoCheck,OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router'
import { CartService } from 'src/app/cart.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck,OnDestroy {

login : boolean = false;
auth : boolean =false;
Username: String =" ";
clearObserver : Subscription;
totalItems =0 ;
isNavbarCollapsed = true;

constructor(private route: Router,private cart : CartService){}

checkToken(){
  if(localStorage.getItem('token') != null)
  {
    this.login = true;
    var  helper = new JwtHelperService();
    var  token =localStorage.getItem('token');
    var decoded = helper.decodeToken(token);
    this.Username = decoded.name;
    if(decoded.auth == "Admin")
    {
      this.auth = true;
    }
    else
    {
      this.auth = false;
    }
  }
}


ngOnInit(){
  this.checkToken();
}

 ngDoCheck(){

  this.checkToken();
  this.cart.itemQuantity.subscribe(
    (values :{ quantity : any}) => this.totalItems = values.quantity
  );
}


logOut()
{
 localStorage.removeItem('token');
 this.route.navigate(['/login']);
 this.login = false;
}

ngOnDestroy(){
//this.clearObserver.unsubscribe();
}

}
