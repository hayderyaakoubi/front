import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class ErrorDisplayComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}
