import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CustomerService, IProductResponse } from 'src/app/service/customer.service';
import { ExpedientService } from 'src/app/service/expedient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: IProductResponse[] = [];

  constructor(private readonly authService: AuthService,
    private readonly customerService: CustomerService, 
    private readonly expedientService: ExpedientService, 
    private readonly router: Router) {}

    ngOnInit(): void {
      const document = sessionStorage.getItem('documentNumber');
      let isCustomer = false

      if (document !== null) {
        isCustomer = true
      }
      
      this.customerService.getProducts(isCustomer)
        .subscribe((resp) => {
          this.products = resp;
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
