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
    gender: new FormControl('')
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
    sessionStorage.setItem('documentNumber', this.customer.value.docNumber + "");
    sessionStorage.setItem('name', this.customer.value.name + "");
    sessionStorage.setItem('middleName', this.customer.value.middleName + "");
    sessionStorage.setItem('lastName', this.customer.value.fatherLastname + "");
    sessionStorage.setItem('motherLastName', this.customer.value.motherLastname + "");
    // sessionStorage.setItem('maritalStatus', this.customer.value.name + "");
    // sessionStorage.setItem('age', resp.age.toString());
    sessionStorage.setItem('gender', this.customer.value.gender + "");
    sessionStorage.setItem('birthdate', this.customer.value.birthday + "");
    sessionStorage.setItem('email', this.customer.value.email + "");
    sessionStorage.setItem('documentType', this.customer.value.docType + "");
    sessionStorage.setItem('phone', this.customer.value.phone + "");

    console.log(this.customer.value.name)
    this.router.navigateByUrl('/credit/product-config')
  }

  annuled() {
    console.log('anular')
    this.expedientService.annuled('EXP0001');
    this.router.navigateByUrl('/dashboard')
  }

}
