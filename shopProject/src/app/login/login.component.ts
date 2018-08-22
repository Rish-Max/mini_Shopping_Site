import { Component, OnInit,OnDestroy} from '@angular/core';
import { ServerService } from 'src/app/sever.service';
import {Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  email="";
  Pass="";
  user = {};
  passCheck :boolean=false;
  userCheck :boolean=false;

  constructor(private auth:ServerService,private route :Router ,private redirectRoute : ActivatedRoute) { }

  ngOnInit() {
    var redirectUrl = this.redirectRoute.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('url',redirectUrl);
  }

onSubmit()
{

 this.user={
    email: this.email,
    pass : this.Pass,
  }
  this.auth.login(this.user).subscribe(
  (response) =>{
     if(response.statusText == "noUser")
    {
        this.passCheck = false;
        this.userCheck = true;
    }
    else{
      if(response.statusText == "IncorrectPassword")
      {
          this.passCheck = true;
          this.userCheck = false;
      }
      else
      {
        localStorage.setItem('token',response.json().token);
        var redirectUrl = localStorage.getItem('url');
        if(redirectUrl)
        {
          this.route.navigateByUrl(redirectUrl);
          localStorage.removeItem('url');
        }
        else
        {
            this.route.navigate(['/']);
            localStorage.removeItem('url');
        }
      }
    }
  },
  error => {
    console.log(error);
  }
);
}

ngOnDestroy(){
  localStorage.removeItem('url');
}
}
