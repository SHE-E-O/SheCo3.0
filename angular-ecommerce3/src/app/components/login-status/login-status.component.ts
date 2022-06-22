import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthService } from 'src/app/app.service';
// import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'the-fucking-app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {


  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(@Inject(OKTA_AUTH) private sumElse: OktaAuth, private oktaAuth: OktaAuthService ) { }

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }

    )
  }
  getUserDetails() {
    if (this.isAuthenticated){
      // fecth the logged  in user details (user claims)

      // user full name is exposed as a property name
      this.sumElse.getUser().then(
        (res) => {
          this.userFullName = res.name;
        }
      );

    }
  }

  logout(){
    this.sumElse.signOut();
  }




}
