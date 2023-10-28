import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }


  searchByDocument(docType: any, docNumber: any) {

    const token = sessionStorage.getItem('session')
    console.log("token:", token)
  }

}
