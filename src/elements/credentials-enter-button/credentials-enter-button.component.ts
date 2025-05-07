import { Component, Input } from '@angular/core';
import { waitForMessage, login, register } from '../../app/app.api-handler';
import shajs from 'sha.js';

@Component({
  selector: 'app-credentials-enter-button',
  imports: [],
  templateUrl: './credentials-enter-button.component.html',
  styleUrl: './credentials-enter-button.component.scss',
})
export class CredentialsEnterButtonComponent {
  //Properties
  @Input() name = '';
  @Input() requestType = '';
  //User Data
  private username = '';
  private usertag = '';
  private userpassword = '';

  //Login/Register Button Logic
  async onClick() {
    const userhash = shajs('sha256')
      .update(this.userpassword)
      .digest('hex')
      .toUpperCase(); //Convert password to hash

    //Register Button Logic
    if (this.name === 'Register') {
      //Register Request
      register(this.username, this.usertag, userhash);
    } else if (this.name === 'Login') {
      //Login Button Logic
      const ws = new WebSocket('wss://hm-api.dnascanner.de'); //Login Websocket
      await new Promise<void>((resolve) => (ws.onopen = () => resolve));
      login(ws, this.usertag, userhash);
    }
  }
}
