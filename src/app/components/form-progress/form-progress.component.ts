import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-progress',
  templateUrl: './form-progress.component.html',
  styleUrls: ['./form-progress.component.scss']
})
export class FormProgressComponent implements OnInit {
  @Input() steps: number[] = [1, 2];
  @Input() currentStep: number = 1;
  size: string = '100px';

  constructor() {
  }

  ngOnInit(): void {
  }

}
