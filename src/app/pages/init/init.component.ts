import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';

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

  searchByDocument() {
    console.log(this.client.value.docType)
    console.log(this.client.value.docNumber)

    this.customerService.searchByDocument(this.client.value.docType, this.client.value.docNumber)
    .subscribe((resp) => console.log(resp));

    this.router.navigateByUrl('/dashboard')
  }

}
