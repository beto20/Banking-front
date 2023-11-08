import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import {  ExpedientService } from '../../service/expedient.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  customer = new FormGroup({
    name: new FormControl(''),
    fatherLastname: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
    docType: new FormControl(''),
    middleName: new FormControl(''),
    motherLastname: new FormControl(''),
    phone: new FormControl(''),
    docNumber: new FormControl(''),
  });

  constructor(private readonly customerService: CustomerService,
    private readonly expedientService: ExpedientService,
    private readonly router: Router) {}

  ngOnInit(): void {

    const customer = this.getCustomerData();

    // this.customer.setValue({
    //   name: customer.name,
    //   fatherLastname: customer.fatherLastname
    // })
    console.log(this.customer.value.name)
  }


  getCustomerData() {

    const docType = '';
    const docNumber = '';

    // this.customerService.searchByDocument(docType, docNumber);

    const customer: any = {
      name: "Alberto",
      fatherLastname: "Velasquez"
    }

    return customer;
  }

  next() {
    console.log(this.customer.value.name)
    this.router.navigateByUrl('/credit/product-config')
  }

  annuled() {
    console.log('anular')
    this.expedientService.annuled('EXP0001');
    this.router.navigateByUrl('/dashboard')
  }

}
