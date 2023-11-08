import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { ExpedientService } from 'src/app/service/expedient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly authService: AuthService,
    private readonly customerService: CustomerService, 
    private readonly expedientService: ExpedientService, 
    private readonly router: Router) {}

    ngOnInit(): void {
      this.customerService.getProducts(true).subscribe((resp) => {
        console.log(resp);
      })
      
    }

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  generateExpedient() {
    this.expedientService.create("");
  }
}
