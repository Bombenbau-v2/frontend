import { Component,Output,EventEmitter } from '@angular/core';
import { LoginFieldComponent } from "../../element-groups/login-field/login-field.component";
import { CredntialsAlternativeComponent } from "../../elements/credntials-alternative/credntials-alternative.component";
import { waitForMessage, login, register } from '../../app/app.api-handler';
import shajs from 'sha.js';

@Component({
  selector: 'app-login-page',
  imports: [LoginFieldComponent, CredntialsAlternativeComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
}
