import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  clientData = sessionStorage.getItem('documentNumber') === '' || null ? 'No cliente' : 'Cliente: ' + sessionStorage.getItem('documentNumber')

  constructor(private readonly authService: AuthService, 
    private readonly router: Router) {}
  
  ngOnInit(): void {
    this.clientData
  }

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
