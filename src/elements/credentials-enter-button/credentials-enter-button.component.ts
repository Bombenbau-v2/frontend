import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credentials-enter-button',
  imports: [],
  templateUrl: './credentials-enter-button.component.html',
  styleUrl: './credentials-enter-button.component.scss',
})
export class CredentialsEnterButtonComponent {
  @Input() name = '';
  @Output() clickFunctionCalled = new EventEmitter<any>();

  onClick() {
    this.clickFunctionCalled.emit();   
  }
}
