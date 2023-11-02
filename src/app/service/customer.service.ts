import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  registerCustomer(customerDto: any) {

    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    // DTO structure move this to the component
    // const customerDto = { 
    //   name: "",
    //   middleName: "",
    //   lastName: "",
    //   motherLastName: "",
    //   maritalStatus: "",
    //   birthdate: "",
    //   documentType: "",
    //   documentNumber: "",
    //   gender: "",
    //   email: "",
    //   phone: "",
    // }

  }

  searchByDocument(docType: any, docNumber: any): CustomerResponse {

    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    const result: CustomerResponse = { 
      name: "",
      middleName: "",
      lastName: "",
      motherLastName: "",
      maritalStatus: "",
      birthdate: "",
      documentType: "",
      documentNumber: "",
      gender: "",
      age: 1,
      email: "",
      phone: "",
    }

    return result;
  }

  getProducts(): Observable<ProductResponse[]> {

    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    // let result: ProductResponse

    const m = this.http.get<ProductResponse[]>('http://10.100.176.55:8080/api/v1/products/false');

    // m.subscribe((resp: ProductResponse[]) => {
      
    //   resp.push

    //   // result: ProductResponse = { 
    //   //   title: resp.title,
    //   //   freeField1: resp.freeField1,
    //   //   freeField2: resp.freeField2,
    //   //   freeField3: resp.freeField3,
    //   //   freeField4: resp.freeField4,
    //   //   freeField5: resp.freeField5,
    //   //   imageURL: resp.imageURL,
    //   // }


    // });


    return m;

    // return result;
  }

}

export interface CustomerResponse { 
  name: string;
  middleName: string;
  lastName: string;
  motherLastName: string;
  maritalStatus: string;
  birthdate: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
}

export interface ProductResponse { 
  title: string;
  freeField1: string;
  freeField2: string;
  freeField3: string;
  freeField4: string;
  freeField5: string;
  imageURL: string;
}