import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedientService {

  host: string = 'https://afbe5c57d41594d48a6f6580cf160214-2089909704.us-west-2.elb.amazonaws.com';
  expedientPath: string = 'alfa-expedient/api/v1/expedients';

  constructor(private http: HttpClient) { }

  create(expedientDto: any) {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    console.log("exp 2"+expedientDto)

    const name = sessionStorage.getItem('name');
    const middlename = sessionStorage.getItem('name');
    const lastName = sessionStorage.getItem('name');
    const motherLastName = sessionStorage.getItem('name');
    const maritalStatus = sessionStorage.getItem('maritalStatus');
    const documentType = sessionStorage.getItem('documentType');
    const documentNumber = sessionStorage.getItem('documentNumber');

    const expNumber = Math.random() * 1000;
    const x = Math.round(expNumber)
    
    const request: IExpedientRequest = {
      productCode: 'CREDITO_0001',
      expedientNumber: 'EXP_' + x,
      expedientPersonId: '',
      status: 'ACTIVO',
      productName: 'CREDITO',
      description: 'mock',
      name: name + '',
      middleName: middlename + '',
      lastName: lastName + '',
      motherLastName: motherLastName + '',
      maritalStatus: '',
      documentType: documentType + '',
      documentNumber: documentNumber + ''
    }

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    sessionStorage.setItem('expedientNumber', request.expedientNumber);

    return this.http.post(`${this.host}/${this.expedientPath}/generate`, request, header);
  }

  getExpedient(expedientNumber: any): Observable<IExpedientResponse> {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.get<IExpedientResponse>(`${this.host}/${this.expedientPath}/${expedientNumber}`, header);
  }

  annuled(expedientNumber: any) {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.patch(`${this.host}/${this.expedientPath}/cancel/${expedientNumber}`, header);
  }
}

export interface IExpedientResponse {
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

export interface IExpedientRequest {
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
