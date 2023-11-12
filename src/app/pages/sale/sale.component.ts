import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private readonly router: Router) {}

  completeName = '';
  cardNumber = '';
  brand = '';
  type = '';
  creditLine = '';
  disbursementAmount = '';
  tea = '';
  disbursementType = 'Abono en cuenta';
  quota = '';
  term = '';
  paymentDate = '15 de cada mes';


  ngOnInit(): void {

    const name = sessionStorage.getItem('name');
    const midlename = sessionStorage.getItem('middleName') + '';
    const lastname = sessionStorage.getItem('lastName') + '';
    const motherlastname = sessionStorage.getItem('motherLastName') + '';
    const cardNumber = sessionStorage.getItem('cardNumber') + '';
    const brand = sessionStorage.getItem('brand') + '';
    const type = sessionStorage.getItem('type') + '';
    const creditLine = sessionStorage.getItem('creditLine') + '';
    const disbursementAmount = sessionStorage.getItem('offerAmount') + '';
    const tea = sessionStorage.getItem('tea') + '';
    const quota = sessionStorage.getItem('quota') + '';
    const term = sessionStorage.getItem('term') + '';

    this.completeName = name + ' ' + midlename + ' ' + lastname + ' ' + motherlastname;
    this.cardNumber = '1928*******74348';
    this.brand = 'VISA';
    this.type = 'SIGNATURE';
    this.creditLine = creditLine;
    this.disbursementAmount = disbursementAmount;
    this.tea = tea;
    this.quota = Math.round(parseFloat(quota)).toFixed(2).toString();
    this.term = term;

  }

  finishFlow() {
    this.router.navigate(['/dashboard']);
  }

}
