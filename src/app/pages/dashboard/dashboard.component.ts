import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CustomerService, IProductResponse } from 'src/app/service/customer.service';
import { ExpedientService, IExpedientRequest } from 'src/app/service/expedient.service';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: IProductResponse[] = [];

  title: string = '';
  freeField1: string = '';
  freeField2: string = '';
  freeField3: string = '';
  freeField4: string = '';
  freeField5: string = '';
  imageURL: string = '';

  titlex: string = '';
  freeField1x: string = '';
  freeField2x: string = '';
  imageURLx: string = '';

  constructor(private readonly authService: AuthService,
    private readonly customerService: CustomerService, 
    private readonly expedientService: ExpedientService, 
    private readonly creditService: CreditService, 
    private readonly router: Router) {}

  ngOnInit(): void {
    const document = sessionStorage.getItem('documentNumber');
    let isCustomer = false

    if (document !== null) {
      isCustomer = true
    }
    
    this.customerService.getProducts(isCustomer)
      .subscribe((resp) => {
        this.title = resp[0].title;
        this.freeField1 = resp[0].freeField1;
        this.freeField2 = resp[0].freeField2;
        this.imageURL = resp[0].imageURL;

        this.titlex = resp[1].title;
        this.freeField1x = resp[1].freeField1;
        this.freeField2x = resp[1].freeField2;
        this.imageURLx = resp[1].imageURL;

        console.log(resp);
      })
    
    // this.creditService.validateBlacklist(document)
    //   .subscribe(res => {
    //     console.log(res);
    //     if (res.hasBlacklist) {
    //       alert('No se pude continuar con el cliente');
    //       this.router.navigateByUrl('/init');
    //     }
    //   })
  }

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  generateExpedient(product: string) {
    this.router.navigateByUrl('/credit/personal-info');
    this.expedientService.create(product).subscribe(res => console.log(res));
  }
}
