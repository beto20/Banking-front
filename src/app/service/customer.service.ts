import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

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

  getProducts(customer: any): ProductResponse[] {

    const token = sessionStorage.getItem('session')
    console.log("token:", token)

    const result: ProductResponse[] = [
      { 
        title: "",
        freeField1: "",
        freeField2: "",
        freeField3: "",
        freeField4: "",
        freeField5: "",
        imageURL: "",
      },
      { 
        title: "",
        freeField1: "",
        freeField2: "",
        freeField3: "",
        freeField4: "",
        freeField5: "",
        imageURL: "",
      }
    ]

    return result;
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