import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const POOLDATA = {
  UserPoolId: 'us-west-2_XOw1N9u7a',
  ClientId: '328dgt6e82ug7irk05er6cvurv'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly router: Router) { }

  getUserPool(): CognitoUserPool {
    return new CognitoUserPool(POOLDATA);
  }

  logout() {
    const userPool = this.getUserPool();
    const currentUser =  userPool.getCurrentUser();
    currentUser?.signOut();
  }

  isAuth(): boolean {
    let isAuth = false;
    const userPool = this.getUserPool();
    const currentUser =  userPool.getCurrentUser();

    if(currentUser != null) {
      currentUser.getSession((error: any, session: any) => {
        if(error) {
          alert(error.message || JSON.stringify(error));
        }
        isAuth = session.isValid();
      });
    }

    return isAuth;
  }

  getToken(username?: any, password?: any) {
    const userPool = this.getUserPool();
    
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken()
        console.log('getJwtToken:', token);
        sessionStorage.setItem('session', 'Bearer ' + token);
        this.router.navigateByUrl('/init')
      },
      onFailure: (error) => {
        alert(error.message || JSON.stringify(error));
      }
    });
  }

}
