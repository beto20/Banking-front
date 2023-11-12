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
export class ProductConfigComponent implements OnInit {

  mock = '123465761245'

  evaluationFormGroup = new FormGroup({
    creditLine: new FormControl(),
    requestedAmount: new FormControl(),
  });
  simulationFormGroup = new FormGroup({
    quotas: new FormControl(),
  });
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

  ngOnInit(): void {
    this.existingAccount()
  }

  annuled() {
    console.log('anular')
    const expedientNumber = sessionStorage.getItem('expedientNumber');

    this.expedientService.annuled(expedientNumber).subscribe(data => console.log(data));
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

  term1: string = '';
  term2: string = '';
  term3: string = '';
  term4: string = '';
  term5: string = '';
  term6: string = '';

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

      this.term1 = res.installments[0].quota + ' - ' + res.installments[0].amount + ' - ' + res.installments[0].totalInterestAmount;
      this.term2 = res.installments[1].quota + ' - ' + res.installments[1].amount + ' - ' + res.installments[1].totalInterestAmount;
      this.term3 = res.installments[2].quota + ' - ' + res.installments[2].amount + ' - ' + res.installments[2].totalInterestAmount;
      this.term4 = res.installments[3].quota + ' - ' + res.installments[3].amount + ' - ' + res.installments[3].totalInterestAmount;
      this.term5 = res.installments[4].quota + ' - ' + res.installments[4].amount + ' - ' + res.installments[4].totalInterestAmount;
      this.term6 = res.installments[5].quota + ' - ' + res.installments[5].amount + ' - ' + res.installments[5].totalInterestAmount;
    });
  }
  account0: string = 'NUEVA';
  account1: string = '';
  account2: string = '';

  existingAccount() {
    const documentNumber = sessionStorage.getItem('documentNumber');

    this.creditService.existingAccount(documentNumber).subscribe(res => {
      console.log(res)

      this.account1 = res[0].accountNumber + ' - ' + res[0].currency;
      this.account2 = res[1].accountNumber + ' - ' + res[1].currency;
    });

  }

  saleProcess() {
    this.account = this.saleFormGroup.value.account;
    this.accountNumber = this.saleFormGroup.value.accountNumber;
    const quotas = this.simulationFormGroup.value.quotas;

    console.log('saleFunc')
    console.log('saleFunc', this.creditLine)
    console.log('saleFunc', this.requestedAmount)
    console.log('saleFunc', this.offerAmount)
    console.log('account', this.account)
    console.log('accountNumber', this.accountNumber)
    console.log('quotas', quotas)

    const account = this.accountNumber.split('-');
    const termQuotas = quotas.split('-');

    
    let tea: string | null = sessionStorage.getItem('tea');
    let x = tea === null ? '0.14' : tea;


    const exp = sessionStorage.getItem('expedientNumber');
    const productType = sessionStorage.getItem('productType');


    const saleDto = {
      expedientNumber: exp,
      creditType: productType,
      creditLine: this.creditLine,
      requestedAmount: this.requestedAmount,
      agreedAmount: this.offerAmount,
      interestRate: parseFloat(x),
      quota: termQuotas[1],
      term: termQuotas[0],
      hasDebt: false,
      totalDebtAmount: 0.00,
      disbursementType: this.account,
      disbursementAccount: account[0],
      hasAccount: true,
      name: sessionStorage.getItem('name'),
      lastname: sessionStorage.getItem('lastName'),
      gender: sessionStorage.getItem('gender'),
      birthdate: sessionStorage.getItem('birthdate'),
      document: sessionStorage.getItem('documentType'),
      documentNumber: sessionStorage.getItem('documentNumber'),
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone'),
      isClient: true,
    }

    sessionStorage.setItem('term', termQuotas[0]);
    sessionStorage.setItem('quota', termQuotas[1]);
    sessionStorage.setItem('totalQuotaAmount', termQuotas[2]);

    this.creditService.sale(saleDto).subscribe(res => console.log(res));
    this.router.navigateByUrl('/credit/sale')
  }

}
