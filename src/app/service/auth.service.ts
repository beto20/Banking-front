import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(username?: any, password?: any): boolean {
    
    // fetch to cognito -> true

    // return token

    
    if(username === 'admin' && password === '1234') {

      const token = 'qweasd';
      sessionStorage.setItem('session', token)

      return true;
    }


    return false;
  }

}
