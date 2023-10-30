import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private readonly authService: AuthService, 
    private readonly router: Router) {}

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
