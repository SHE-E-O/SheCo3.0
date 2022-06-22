import { Component, OnInit, Inject } from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import  OktaSignIn from '@okta/okta-signin-widget';
import shecoConfig from 'src/app/config/sheco-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: shecoConfig.oidc.issuer.split('/oauth2')[0],
      clientId: shecoConfig.oidc.clientId,
      redirectUri: shecoConfig.oidc.redirectUri,
      authParams: {
         pkce: true,
         issuer: shecoConfig.oidc.issuer,
         scopes: shecoConfig.oidc.scopes
      }
      
    });
    
    
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el:'#okta-sign-in-widget'
    },
    (response: any) =>{
      if (response.status === 'SUCCESS'){
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any) => {
      throw error;
    }
    );
  }

}
