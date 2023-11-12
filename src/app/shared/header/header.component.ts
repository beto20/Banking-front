import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  clientData = sessionStorage.getItem('documentNumber') === '' || null ? 'No cliente' : 'Cliente: ' + sessionStorage.getItem('documentNumber')

  clientStatus = '';

  constructor(private readonly authService: AuthService,
    private readonly creditService: CreditService, 
    private readonly router: Router) {}
  
  ngOnInit(): void {
    this.clientData

    const document = sessionStorage.getItem('documentNumber');
    this.creditService.validateBlacklist(document)
    .subscribe(res => {
      console.log(res);
      if (res.isPotential) {
        this.clientStatus = 'Potencial'
      }
      if (res.isRisky) {
        this.clientStatus = 'Por evaluar'
      }
    })

  }

  closeSession() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  backToInit() {
    this.router.navigateByUrl('/init');
    sessionStorage.clear();
    return;
  }

}
