import { Component, ChangeDetectionStrategy, Output, signal, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-password-field',
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule,NgIf],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent {
  @Input() failState: boolean = false; 

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  //Input Handling
  @Output() emitInput = new EventEmitter<string>();
  InputEvent(event: Event){
  
    let password = (event.target as HTMLInputElement).value;
    this.emitInput.emit(password);
  }
}
