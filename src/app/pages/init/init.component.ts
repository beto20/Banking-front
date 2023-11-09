import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService, ICustomerResponse } from '../../service/customer.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(private readonly customerService: CustomerService, 
    private readonly router: Router) {}

  ngOnInit(): void {
    this.customerService.getProducts(true).subscribe((resp) => {
      console.log(resp);
    })
    
  }

  client = new FormGroup({
    docType: new FormControl(''),
    docNumber: new FormControl('')
  });

  searchByDocument()  {
    console.log(this.client.value.docType)
    console.log(this.client.value.docNumber)

    this.customerService.searchByDocument(this.client.value.docType, this.client.value.docNumber)
    .subscribe((resp) => {

      sessionStorage.setItem('documentNumber', this.client.value.docNumber + "");
      sessionStorage.setItem('name', resp.name);
      sessionStorage.setItem('middleName', resp.middleName);
      sessionStorage.setItem('lastName', resp.lastName);
      sessionStorage.setItem('motherLastName', resp.motherLastName);
      sessionStorage.setItem('maritalStatus', resp.maritalStatus);
      // sessionStorage.setItem('age', resp.age.toString());
      sessionStorage.setItem('birthdate', resp.birthdate);
      sessionStorage.setItem('email', resp.email);
      sessionStorage.setItem('documentType', this.client.value.docType + "");
      sessionStorage.setItem('phone', resp.phone);
      console.log(resp)
    });


    this.router.navigateByUrl('/dashboard')
  }

}
