import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  host: string = 'https://ad172ad30c04646e9ba81fcac6dcc17a-813922458.us-west-2.elb.amazonaws.com';
  creditPath: string = 'alfa-credit/api/v1/credits';
  businessPath: string = 'alfa-credit/api/v1/business';

  constructor(private http: HttpClient) { }

  validateBlacklist(documentNumber: any): Observable<IBlacklistResponse> {
    const token = sessionStorage.getItem('session');

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.get<IBlacklistResponse>(`${this.host}/${this.businessPath}/blacklist/${documentNumber}`, header);
  }


  evaluation(evaluationDto: any): Observable<IEvaluationResponse> {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const request: IEvaluationRequest = {
      documentType: evaluationDto.documentType,
      documentNumber: evaluationDto.documentNumber,
      creditLine: evaluationDto.creditLine,
      amountRequired: evaluationDto.amountRequired
    };

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.post<IEvaluationResponse>(`${this.host}/${this.creditPath}/evaluation`, request, header);
  }

  simulation(simulationDto: any): Observable<ISimulationResponse> {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const request = {
      tea: simulationDto.tea,
      simulationAmount: simulationDto.simulationAmount,
    };

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.post<ISimulationResponse>(`${this.host}/${this.creditPath}/simulation`, request, header);
  }

  existingAccount(documentNumber: any): Observable<IAccountResponse[]> {
    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.get<IAccountResponse[]>(`${this.host}/${this.creditPath}/accounts/${documentNumber}`, header);
  }

  sale(saleDto: any): Observable<ISaleResponse> {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const request: ISaleRequest = {
      expedientNumber: saleDto.expedientNumber,
      creditType: saleDto.creditType,
      creditLine: saleDto.creditLine,
      requestedAmount: saleDto.requestedAmount,
      agreedAmount: saleDto.agreedAmount,
      interestRate: saleDto.interestRate,
      quota: saleDto.quota,
      term: saleDto.term,
      hasDebt: saleDto.hasDebt,
      totalDebtAmount: saleDto.totalDebtAmount,
      disbursementType: saleDto.disbursementType,
      disbursementAccount: saleDto.disbursementAccount,
      hasAccount: saleDto.hasAccount,
      name: saleDto.name,
      lastname: saleDto.lastname,
      gender: saleDto.gender,
      birthdate: saleDto.birthdate,
      document: saleDto.document,
      documentNumber: saleDto.documentNumber,
      email: saleDto.email,
      phone: saleDto.phone,
      isClient: saleDto.isClient
    };

    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.post<ISaleResponse>(`${this.host}/${this.creditPath}/disbursement`, request, header);
  }
}

export interface IBlacklistResponse {
  isPotential: boolean;
  isRisky: boolean;
  hasBlacklist: boolean;
}

export interface IEvaluationResponse {
  qualificationResult: string;
  maxAmountApproved: number;
  minAmountApproved: number;
  tea: string;
}

export interface IEvaluationRequest {
  documentType: string;
  documentNumber: string;
  creditLine: number;
  amountRequired: string;
}

export interface ISimulationResponse {
  dueDate: string;
  installments: IInstallment[];
}

export interface IInstallment {
  quota: number;
  amount: number;
  totalInterestAmount: number;
}

export interface IAccountResponse {
  accountNumber: string,
  currency: string,
  alias: string,
}

export interface ISaleResponse {
  transactionCode: string;
  disbursementDate: string;
  status: string;
}

export interface ISaleRequest {
  expedientNumber: string;
  creditType: string;
  creditLine: number;
  requestedAmount: number;
  agreedAmount: number;
  interestRate: number;
  quota: number;
  term: string;
  hasDebt: boolean;
  totalDebtAmount: number;
  disbursementType: string;
  disbursementAccount: string;
  hasAccount: boolean;
  name: string;
  lastname: string;
  gender: string;
  birthdate: string;
  document: string;
  documentNumber: string;
  email: string;
  phone: string;
  isClient: boolean;
}