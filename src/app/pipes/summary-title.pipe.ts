import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryTitle'
})
export class SummaryTitlePipe implements PipeTransform {
  map: { [key: string]: string } = {
    profile: 'Profile Information',
    contact: 'Contact Information',
    employment: 'Employment Information',
    loan: 'Loan Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    code: 'Bank Code',
    gender: 'Gender',
    dob: 'Date of Birth',
    email: 'Email',
    mobile: 'Mobile',
    address: 'Home Address',
    company: 'Current Employer',
    role: 'Role',
    salary: 'Monthly Salary',
    amount: 'Amount',
    tenor: 'Duration (in months)',
    repaymentDate: 'Repayment Date'
  };

  transform(value: string): string {
    return this.map[value];
  }

}
