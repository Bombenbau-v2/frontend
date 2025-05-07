import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PasswordFieldComponent } from "../../elements/password-field/password-field.component";
import { UsernameFieldComponent } from "../../elements/username-field/username-field.component";
import { CredentialsEnterButtonComponent } from "../../elements/credentials-enter-button/credentials-enter-button.component";

@Component({
  selector: 'app-registration-field',
  imports: [PasswordFieldComponent, UsernameFieldComponent, CredentialsEnterButtonComponent],
  templateUrl: './registration-field.component.html',
  styleUrl: './registration-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class RegistrationFieldComponent {
}
