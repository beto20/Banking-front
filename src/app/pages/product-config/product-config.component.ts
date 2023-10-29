import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css']
})
export class ProductConfigComponent {

  mock = '123465761245'

  evaluationFormGroup = new FormGroup({
    creditLine: new FormControl(),
    requestedAmount: new FormControl(),
  });
  simulationFormGroup = new FormGroup({});
  saleFormGroup = new FormGroup({
    account: new FormControl(),
    accountNumber: new FormControl(),
  });

  offerAmount?: any
  creditLine? : any;
  requestedAmount? : any;
  account? : any;
  accountNumber? : any;

  constructor(private readonly creditService: CreditService,
    private readonly router: Router) {}


  annuled() {
    console.log('anular')
  }

  creditEvaluation() {
    this.creditLine = this.evaluationFormGroup.value.creditLine;
    this.requestedAmount = this.evaluationFormGroup.value.requestedAmount;

    console.log('evaluate')
    console.log('creditLine value', this.creditLine)
    console.log('requestedAmount value', this.requestedAmount)
    this.offerAmount = 3000.00

    const evaluationDto = {
      documentType: "DNI",
      documentNumber: "41572392",
      creditLine: this.creditLine,
      amountRequired: this.requestedAmount,
    }

    this.creditService.evaluation(evaluationDto);
  }

  creditSimulation(offerAmount: any) {
    console.log('simulate')
    console.log('offerAmount value', offerAmount)

    const simulationDto = {
      tea: 0.14,
      simulationAmount: offerAmount
    }

    this.creditService.simulation(simulationDto);
  }

  saleProcess() {
    this.account = this.saleFormGroup.value.account;
    this.accountNumber = this.saleFormGroup.value.accountNumber;
    console.log('saleFunc')
    console.log('saleFunc', this.creditLine)
    console.log('saleFunc', this.requestedAmount)
    console.log('saleFunc', this.offerAmount)
    console.log('saleFunc', this.account)
    console.log('saleFunc', this.accountNumber)

    const saleDto = {
      expedientNumber: "EXP00001", // FALTA
      creditType: "HIPOTECARIO", // FALTA
      creditLine: this.creditLine,
      requestedAmount: this.requestedAmount,
      agreedAmount: this.offerAmount,
      interestRate: 0.14,
      quota: "",
      term: "",
      hasDebt: false, // FALTA
      totalDebtAmount: 0.00,
      disbursementType: this.account,
      disbursementAccount: this.accountNumber,
      hasAccount: true,
      name: "",
      lastname: "",
      gender: "",
      birthdate: "",
      document: "",
      documentNumber: "",
      email: "",
      phone: "",
      isClient: true,
    }

    this.creditService.sale(saleDto);
    this.router.navigateByUrl('/credit/sale')
  }

}
