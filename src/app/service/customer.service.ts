import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  host: string = 'https://afbe5c57d41594d48a6f6580cf160214-2089909704.us-west-2.elb.amazonaws.com';
  customerPath: string = 'alfa-customer/api/v1/customers';
  productPath: string = 'alfa-customer/api/v1/products';

  constructor(private http: HttpClient) { }

  registerCustomer(customerDto: any) {
    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    const customerRequest: ICustomerRequest = { 
      name: customerDto.name,
      middleName: customerDto.middleName,
      lastName: customerDto.lastName,
      motherLastName: customerDto.motherLastName,
      maritalStatus: customerDto.maritalStatus,
      birthdate: customerDto.birthdate,
      documentType: customerDto.documentType,
      documentNumber: customerDto.documentNumber,
      gender: customerDto.gender,
      email: customerDto.email,
      phone: customerDto.phone,
    }

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.post(`${this.host}/${this.customerPath}/register`, customerRequest, header);
  }

  searchByDocument(docType: any, docNumber: any): Observable<ICustomerResponse> {
    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.get<ICustomerResponse>(`${this.host}/${this.customerPath}/${docType}/${docNumber}`, header);
  }

  getProducts(isCustomer: boolean): Observable<IProductResponse[]> {
    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.get<IProductResponse[]>(`${this.host}/${this.productPath}/${isCustomer}`, header);
  }

}

export interface ICustomerRequest { 
  name: string;
  middleName: string;
  lastName: string;
  motherLastName: string;
  maritalStatus: string;
  birthdate: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  email: string;
  phone: string;
}

export interface ICustomerResponse { 
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

export interface IProductResponse { 
  title: string;
  freeField1: string;
  freeField2: string;
  freeField3: string;
  freeField4: string;
  freeField5: string;
  imageURL: string;
}