import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  validateCredentials() {
    console.log('Login username: ', this.loginForm.value.username)
    console.log('Login password: ', this.loginForm.value.password)

    const hasAccess = this.authService.getToken(this.loginForm.value.username , this.loginForm.value.password )

    console.log(hasAccess)
    if(hasAccess === true) {
      this.router.navigateByUrl('/init')
    }
  }

}
