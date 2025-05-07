import { Component, Input } from '@angular/core';
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
  private username = 'Test Man';
  private usertag = 'testman2';
  private userpassword = 'blablabla123';

  //Login/Register Button Logic
  async onClick() {
    const userhash = shajs("sha256").update(this.userpassword).digest('hex'); //Convert password to hash
    console.log(userhash);
    //Register Button Logic
    if (this.name === 'Register') {
      //Register Request
      fetch('https://mm-api.dnascanner.de/register', {
        method: 'POST',
        body: JSON.stringify({
          name: this.username,
          tag: this.usertag,
          hash: userhash,
        }),
      });
    } else if (this.name === 'Login') { //Login Button Logic
      const ws = new WebSocket('wss://mm-api.dnascanner.de'); //Login Websocket
      await new Promise<void>(
        (resolve) =>
          (ws.onopen = () => {
            resolve();
          })
      );
      ws.onmessage = (e) => console.log(e.data);
      ws.onclose = () => console.log('CLOSED');
      ws.onerror = (e) => console.log('ERROR', e);

      ws.send(JSON.stringify({request: "/login", data: {tag: this.usertag, password: userhash}}))
    }
  }
}
