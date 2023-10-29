import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor() { }

  validateBlacklist(documentNumber: any): BlacklistResponse {

    const token = sessionStorage.getItem('session');

    const result: BlacklistResponse = {
      isPotential: true,
      isRisky: false,
      hasBlacklist: false,
    };

    return result;
  }


  evaluation(evaluationDto: any): EvaluationResponse {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const result: EvaluationResponse = {
      qualificationResult: "",
      maxAmountApproved: 1000.00,
      minAmountApproved: 100.00,
      tea: "",
    };

    return result;
  }

  simulation(simulationDto: any): SimulationResponse {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const installments: Installment[] = [
      {
        quota: 100.00,
        amount: 1000.00,
        totalInterestAmount: 100.00,
      },
      {
        quota: 100.00,
        amount: 1000.00,
        totalInterestAmount: 100.00,
      }
    ];
    
    const result: SimulationResponse = {
      dueDate: "",
      installments: installments,
    };

    return result;
  }

  existingAccount(documentNumber: any): AccountResponse[] {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const result: AccountResponse[] = [
      {
        accountNumber: "",
        currency: "",
        alias: "",
      },
      {
        accountNumber: "",
        currency: "",
        alias: "",
      }
    ];

    return result;
  }

  sale(saleDto: any): SaleResponse {

    const token = sessionStorage.getItem('session');
    console.log("token:", token);

    const result: SaleResponse = {
      transactionCode: "",
      disbursementDate: "",
      status: "",
    };

    return result;
  }
}

export interface BlacklistResponse {
  isPotential: boolean;
  isRisky: boolean;
  hasBlacklist: boolean;
}

export interface EvaluationResponse {
  qualificationResult: string;
  maxAmountApproved: number;
  minAmountApproved: number;
  tea: string;
}

export interface SimulationResponse {
  dueDate: string;
  installments: Installment[];
}

export interface Installment {
  quota: number;
  amount: number;
  totalInterestAmount: number;
}

export interface AccountResponse {
  accountNumber: string,
  currency: string,
  alias: string,
}

export interface SaleResponse {
  transactionCode: string;
  disbursementDate: string;
  status: string;
}