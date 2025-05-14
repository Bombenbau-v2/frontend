import { Component,Output,EventEmitter } from '@angular/core';
import { LoginFieldComponent } from "../../element-groups/login-field/login-field.component";
import { CredentialsAlternativeComponent } from "../../elements/credentials-alternative/credentials-alternative.component";
import { waitForMessage, login, register } from '../../app/app.api-handler';
import shajs from 'sha.js';

@Component({
  selector: 'app-login-page',
  imports: [LoginFieldComponent, CredentialsAlternativeComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
}
