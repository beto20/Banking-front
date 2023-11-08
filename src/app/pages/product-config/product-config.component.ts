import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditService } from 'src/app/service/credit.service';
import { ExpedientService } from 'src/app/service/expedient.service';

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
    private readonly expedientService: ExpedientService,
    private readonly router: Router) {}

    annuled() {
      console.log('anular')
      this.expedientService.annuled('EXP0001');
      this.router.navigateByUrl('/dashboard')
    }

  creditEvaluation() {
    this.creditLine = this.evaluationFormGroup.value.creditLine;
    this.requestedAmount = this.evaluationFormGroup.value.requestedAmount;

    const evaluationDto = {
      documentType: sessionStorage.getItem('documentType'),
      documentNumber: sessionStorage.getItem('documentNumber'),
      creditLine: this.creditLine,
      amountRequired: this.requestedAmount,
    }

    this.creditService.evaluation(evaluationDto).subscribe(res => {
      this.offerAmount = (res.minAmountApproved + res.maxAmountApproved) / 2
      sessionStorage.setItem('offerAmount', this.offerAmount);
      sessionStorage.setItem('creditLine', this.creditLine);
      sessionStorage.setItem('requestedAmount', this.requestedAmount);
      sessionStorage.setItem('tea', res.tea);
      console.log(res)
    });
  }

  creditSimulation(offerAmount: any) {
    console.log('simulate')
    console.log('offerAmount value', offerAmount)

    let tea: string | null;
    tea = sessionStorage.getItem('tea');

    if (tea === null) {
      tea = '0.14'
    }

    const simulationDto = {
      tea: parseFloat(tea),
      simulationAmount: offerAmount
    }

    this.creditService.simulation(simulationDto).subscribe(res => {
      
      console.log(res)
    });
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

    let tea: string | null = sessionStorage.getItem('tea');
    let x = tea === null ? '0.14' : tea;




    const saleDto = {
      expedientNumber: "EXP00001", // FALTA
      creditType: "HIPOTECARIO", // FALTA
      creditLine: this.creditLine,
      requestedAmount: this.requestedAmount,
      agreedAmount: this.offerAmount,
      interestRate: parseFloat(x),
      quota: "",
      term: "",
      hasDebt: false, // FALTA
      totalDebtAmount: 0.00,
      disbursementType: this.account,
      disbursementAccount: this.accountNumber,
      hasAccount: true,
      name: sessionStorage.getItem('name'),
      lastname: sessionStorage.getItem('lastname'),
      gender: sessionStorage.getItem('gender'),
      birthdate: sessionStorage.getItem('birthdate'),
      document: sessionStorage.getItem('documentType'),
      documentNumber: sessionStorage.getItem('documentNumber'),
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone'),
      isClient: true,
    }

    this.creditService.sale(saleDto).subscribe(res => console.log(res));;
    this.router.navigateByUrl('/credit/sale')
  }

}
