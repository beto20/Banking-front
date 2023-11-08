import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

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
    this.cardNumber = cardNumber;
    this.brand = brand;
    this.type = type;
    this.creditLine = creditLine;
    this.disbursementAmount = disbursementAmount;
    this.tea = tea;
    this.quota = quota;
    this.term = term;

  }

}
