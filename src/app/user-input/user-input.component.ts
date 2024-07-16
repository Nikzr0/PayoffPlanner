import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})

export class UserInputComponent {
  calculate = output<InvestmentInput>();


  enteredLoanSize = signal('100');
  enteredMonthlyPayment = signal('1');

  enteredAnnualInterest = signal('5');
  enteredDuration = signal('100');

  constructor(private investmentService: InvestmentService) {}
  
  onSubmit() {
    this.investmentService.CalculateInvestmentResults({loanSize: + this.enteredLoanSize(),
      monthlyPayment: + this.enteredMonthlyPayment(),
      annualInterest: + this.enteredAnnualInterest(),
       duration: + this.enteredDuration()});
  }
}
