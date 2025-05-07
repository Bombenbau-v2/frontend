import {
  Component,
  inject,
  ResourceStreamItem,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  resolveForwardRef,
} from '@angular/core';
import { UsernameFieldComponent } from '../../elements/username-field/username-field.component';
import { PasswordFieldComponent } from '../../elements/password-field/password-field.component';
import { CredentialsEnterButtonComponent } from '../../elements/credentials-enter-button/credentials-enter-button.component';
import { waitForMessage, login, register } from '../../app/app.api-handler';
import { AppComponent } from '../../app/app.component';
import shajs from 'sha.js';
import { constructorChecks } from '@angular/cdk/schematics';
import { SocketService } from '../../app/app.socket-service';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  // waitOpen: () => Promise<unknown>;
  isOpenMethod: () => boolean;
  ws: WebSocket | undefined;

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.isOpenMethod = socketService.isOpenMethod;
  }

  async buttonClicked() {
    const passwordHash = shajs("sha256").update(this.userpassword).digest("hex").toUpperCase();
    
    // Ensure the socket is open, then send login request
    // console.log("before");
    // await this.waitOpen();
    // console.log("after");
    console.log(this.isOpenMethod())
  }

  //Emitted usertag and password from Input fields
  usertagEmitted(usertag: string) {
    this.usertag = usertag;
  }
  passwordEmitted(password: string) {
    this.userpassword = password;
  }
}
