import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private readonly authService: AuthService, 
    private readonly router: Router) {}

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
