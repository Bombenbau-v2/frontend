import { Component } from '@angular/core';
import { UsernameFieldComponent } from "../../elements/username-field/username-field.component";
import { PasswordFieldComponent } from "../../elements/password-field/password-field.component";
import { CredentialsEnterButtonComponent } from "../../elements/credentials-enter-button/credentials-enter-button.component";

@Component({
  selector: 'app-login-field',
  imports: [UsernameFieldComponent, PasswordFieldComponent, CredentialsEnterButtonComponent],
  templateUrl: './login-field.component.html',
  styleUrl: './login-field.component.scss'
})
export class LoginFieldComponent {

}
