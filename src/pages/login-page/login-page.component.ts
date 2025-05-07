import { Component } from '@angular/core';
import { LoginFieldComponent } from "../../element-groups/login-field/login-field.component";
import { CredntialsAlternativeComponent } from "../../elements/credntials-alternative/credntials-alternative.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginFieldComponent, CredntialsAlternativeComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
