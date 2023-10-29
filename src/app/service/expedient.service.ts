import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpedientService {

  constructor() { }

  create(expedientDto: any) {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    // DTO structure move this to the component
    // const expedientDto: ExpedientResponse = {
    //   productCode: "",
    //   expedientNumber: "",
    //   expedientPersonId: "",
    //   status: "",
    //   productName: "",
    //   description: "",
    //   name: "",
    //   middleName: "",
    //   lastName: "",
    //   motherLastName: "",
    //   maritalStatus: "",
    //   documentType: "",
    //   documentNumber: "",
    // }

  }

  getExpedient(): ExpedientResponse {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);


    const result: ExpedientResponse = {
      productCode: "",
      expedientNumber: "",
      expedientPersonId: "",
      status: "",
      productName: "",
      description: "",
      name: "",
      middleName: "",
      lastName: "",
      motherLastName: "",
      maritalStatus: "",
      documentType: "",
      documentNumber: "",
    }

    return result;
  }

  annuled(expedientNumber: any) {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);


  }
}

export interface ExpedientResponse {
  productCode: string;
  expedientNumber: string;
  expedientPersonId: string;
  status: string;
  productName: string;
  description: string;
  name: string;
  middleName: string;
  lastName: string;
  motherLastName: string;
  maritalStatus: string;
  documentType: string;
  documentNumber: string;
}
