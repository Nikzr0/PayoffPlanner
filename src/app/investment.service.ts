import { Injectable, signal } from '@angular/core';
import { InvestmentInput } from './investment-input.model';
@Injectable({ providedIn: 'root' })

export class InvestmentService {
  resultData = signal<{
      year: number;
      interest: number;
      valueEndOfYear: number;
      annualInvestment: number;
      totalInterest: number;
      totalAmountInvested: number;
  }[] | undefined>(undefined);
      
  CalculateInvestmentResults(data: InvestmentInput) {
    const { loanSize, monthlyPayment, annualInterest} = data; // duration

    const annualData = [];
    let loan = loanSize;
    let interestPerYear = 0;
    let totalInterest = 0;
    let totalAmountPaid = 0;
    let year = 0;

    let yearCounter = 0;
    
    annualData.push({
      year: year++,
      interest: 0,
      valueEndOfYear: loan,
      annualInvestment: 0,
      totalInterest: 0,
      totalAmountInvested: 0,
    });

   while ((loan + interestPerYear)  - monthlyPayment * 12 >= 0) {
    interestPerYear = loan * (annualInterest / 100);
      loan += interestPerYear;
      loan -= monthlyPayment * 12;
      totalInterest += interestPerYear;
      totalAmountPaid += monthlyPayment * 12;
      
      annualData.push({
        year: year++,
        interest: interestPerYear,
        valueEndOfYear: loan,
        annualInvestment: monthlyPayment,
        totalInterest: totalInterest,
        totalAmountInvested: totalAmountPaid,
      });

      yearCounter++;
    }

    loan += interestPerYear;
    totalInterest += interestPerYear;
    totalAmountPaid += loan;

    annualData.push({
      year: year++,
      interest: 0,
      valueEndOfYear: 0,
      annualInvestment: monthlyPayment,
      totalInterest: totalInterest,
      totalAmountInvested: totalAmountPaid,
    });

    yearCounter++;

  
    this.resultData.set(annualData); 
  }  
}