import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { dobValidator } from '../validators/dob.validator';
import { loanAmountValidator } from '../validators/loanAmount.validator';
import { salaryValidator } from '../validators/salary.validator';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  processing: boolean = false;
  submitBtn: string = 'Submit';
  step: number = 1;
  steps: number[] = [1, 2, 3, 4, 5];
  genders: string[] = ['Male', 'Female', 'Other'];
  tenors: number[] = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  dates: number[] = [5, 15, 28];
  validAge: any = { min: 21, max: 50 };
  validAmount: any = { min: 1050, max: 1000 };
  summary: any = {};
  loanApplicationForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      gender: ['', Validators.required],
      dob: ['', [Validators.required, dobValidator(this.validAge.min, this.validAge.max)]]
    }),
    contact: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required]
    }),
    employment: this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', [Validators.required, salaryValidator(350)]]
    }),
    loan: this.fb.group({
      amount: ['', Validators.required],
      tenor: ['', Validators.required],
      repaymentDate: ['', Validators.required]
    })
  });

  constructor(private router: Router, private toastService: ToastService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  goForward(): void {
    const flag = this.validateStep();
    if (this.step === 3) this.setMaxAmount();
    if (this.step === 4) this.parseForm();

    if (!flag) {
      this.handleAlert();
    } else {
      this.step++;
    }
  }

  goBack(): void {
    this.step--;
  }

  handleSubmit(): void {
    const flag = this.loanApplicationForm?.status === 'VALID';

    if (!flag) {
      this.handleAlert();
    } else {
      this.processing = true;
      this.submitBtn = 'Sending...';

      setTimeout(() => {
        this.submitBtn = 'Submit';
        this.processing = false;
        this.router.navigate(['/loan-success']);
      }, 3000);
    }
  }

  private validateStep(): boolean {
    const step = this.step;

    if (step === 1) return this.profileForm?.status === 'VALID';
    if (step === 2) return this.contactForm?.status === 'VALID';
    if (step === 3) return this.employmentForm?.status === 'VALID';
    if (step === 4) return this.loanForm?.status === 'VALID';
    return false;
  }

  private setErrors(): void {
    const step = this.step;

    if (step === 1) this.profileForm?.markAllAsTouched();
    if (step === 2) this.contactForm?.markAllAsTouched();
    if (step === 3) this.employmentForm?.markAllAsTouched();
    if (step === 4) this.loanForm?.markAllAsTouched();
  }

  private setMaxAmount(): void {
    if (this.salary?.value) {
      this.validAmount.max = this.salary?.value * 3;
      this.amount?.setValidators([Validators.required, loanAmountValidator(this.validAmount.min, this.validAmount.max)]);
      this.amount?.updateValueAndValidity({ onlySelf: true });
    }
  }

  private parseForm(): void {
    this.summary = Object.entries(this.loanApplicationForm.value)
      .reduce((acc: any, [key, val]): any[] => {
        acc.push([key, Object.entries(val as {})]);
        return acc;
      }, []);
  }

  private handleAlert(): void {
    this.setErrors();
    this.toastService.error('Please fill all required fields');
  }

  get firstName() {
    return this.loanApplicationForm.get('profile.firstName');
  }

  get lastName() {
    return this.loanApplicationForm.get('profile.lastName');
  }

  get code() {
    return this.loanApplicationForm.get('profile.code');
  }

  get gender() {
    return this.loanApplicationForm.get('profile.gender');
  }

  get dob() {
    return this.loanApplicationForm.get('profile.dob');
  }

  get email() {
    return this.loanApplicationForm.get('contact.email');
  }

  get mobile() {
    return this.loanApplicationForm.get('contact.mobile');
  }

  get address() {
    return this.loanApplicationForm.get('contact.address');
  }

  get company() {
    return this.loanApplicationForm.get('employment.company');
  }

  get role() {
    return this.loanApplicationForm.get('employment.role');
  }

  get salary() {
    return this.loanApplicationForm.get('employment.salary');
  }

  get amount() {
    return this.loanApplicationForm.get('loan.amount');
  }

  get tenor() {
    return this.loanApplicationForm.get('loan.tenor');
  }

  get repaymentDate() {
    return this.loanApplicationForm.get('loan.repaymentDate');
  }

  get profileForm() {
    return this.loanApplicationForm.get('profile');
  }

  get contactForm() {
    return this.loanApplicationForm.get('contact');
  }

  get employmentForm() {
    return this.loanApplicationForm.get('employment');
  }

  get loanForm() {
    return this.loanApplicationForm.get('loan');
  }

}
