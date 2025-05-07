import { Component, ChangeDetectionStrategy, Output,EventEmitter, resolveForwardRef } from '@angular/core';
import { UsernameFieldComponent } from '../../elements/username-field/username-field.component';
import { PasswordFieldComponent } from '../../elements/password-field/password-field.component';
import { CredentialsEnterButtonComponent } from '../../elements/credentials-enter-button/credentials-enter-button.component';
import { waitForMessage, login, register } from '../../app/app.api-handler'
import { AppComponent } from '../../app/app.component'
import shajs from 'sha.js';
import { constructorChecks } from '@angular/cdk/schematics';
import { SocketService } from '../../app/app.socket-service';

@Component({
  selector: 'app-login-field',
  imports: [
    UsernameFieldComponent,
    PasswordFieldComponent,
    CredentialsEnterButtonComponent,
  ],
  templateUrl: './login-field.component.html',
  styleUrl: './login-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFieldComponent {
  private usertag = '';
  private userpassword = '';
  ws: WebSocket | undefined;

  constructor(socketService: SocketService){
    this.ws = socketService.socket;
  }

async buttonClicked() {
    //Convert password to hash
    const userhash = shajs('sha256')
        .update(this.userpassword)
        .digest('hex')
        .toUpperCase();

    //Login Button Logic
    await new Promise<void>((resolve) => (this.ws!.onopen = () => resolve()));
    const response = await login(this.ws!, this.usertag, userhash);
    if (response.success) {
      
    }
  }

  //Emitted usertag and password from Input fields
  usertagEmitted(usertag: string) {
    this.usertag = usertag;
  }
  passwordEmitted(password: string) {
    this.userpassword = password; 
}
}
