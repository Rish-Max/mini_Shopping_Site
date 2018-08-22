import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/sever.service';
import {Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  disabled: boolean = false;
  name = "";
  email = "";
  Pass = "";
  ConfirmPass = "";
  user = {};
  passMatch: boolean = false;

  constructor(private auth: ServerService, private route: Router,private redirectRoute : ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    this.user = {
      name: this.name,
      email: this.email,
      pass: this.Pass
    };

    if (this.Pass == this.ConfirmPass) {
      this.auth.signUp(this.user).subscribe(
        (response) => {
          console.log(response.json());
          console.log(response.statusText);
          if (response.statusText == "AlreadyExist") {
            this.disabled = true;
            this.passMatch =false;
          }
          else {
            this.disabled = false;
            localStorage.setItem('token', response.json().token);
            var redirectUrl = localStorage.getItem('url');
            if(redirectUrl)
            {
              this.route.navigateByUrl(redirectUrl);
              localStorage.removeItem('url')
            }
            else
            {
                this.route.navigate(['/']);
                localStorage.removeItem('url');
            }
          }
        },
        error => alert("Check ur Internet Connection")
      );
    }
    else {
      this.passMatch = true;
      this.disabled = false;
    }
  }
  ngOnDestroy(){
    localStorage.removeItem('url');
  }
}
