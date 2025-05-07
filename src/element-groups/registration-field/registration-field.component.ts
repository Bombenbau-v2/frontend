import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PasswordFieldComponent } from "../../elements/password-field/password-field.component";
import { UsernameFieldComponent } from "../../elements/username-field/username-field.component";
import { CredentialsEnterButtonComponent } from "../../elements/credentials-enter-button/credentials-enter-button.component";
import { DisplaynameFieldComponent } from "../../elements/displayname-field/displayname-field.component";
import { waitForMessage, login, register } from '../../app/app.api-handler';
import shajs from 'sha.js';



@Component({
  selector: 'app-registration-field',
  imports: [PasswordFieldComponent, UsernameFieldComponent, CredentialsEnterButtonComponent, DisplaynameFieldComponent],
  templateUrl: './registration-field.component.html',
  styleUrl: './registration-field.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})


export class RegistrationFieldComponent {
    private displayname = '';
    private usertag = '';
    private userpassword = '';
    failMessage = '';

    //Button click logic
    async buttonClicked() {
      //Convert password to hash
      const userhash = shajs('sha256')
        .update(this.userpassword)
        .digest('hex')
        .toUpperCase(); 
    //Register Request
    const registerResponse = await register(this.displayname, this.usertag, userhash);
    if (!registerResponse.success){
      switch(registerResponse.error){
        case "malformed_hash": { this.failMessage = "Registration failed: an internal error has occured."; break;}
        case "no_special_characters": { this.failMessage = "Registration failed: forbidden characters <br>Display Name: only _ or -, letters, numbers and whitespace. <br>User Tag: only _ or -, letters, numbers)."; break;}
        case "missing_fields": { this.failMessage = "Registration failed: fields left empty."; break;}
        case "tag_used": { this.failMessage = "Registration failed: this user tag is already used."; break;}
        default: { this.failMessage = "Registration failed: An unknown error has occured.";};
      }
    }else{
      this.failMessage = "registration successful bitch"
    }
}

  //Input emitters
    usertagEmitted(usertag: string) {
      this.usertag = usertag;
    }
    passwordEmitted(password: string) {
      this.userpassword = password;
    }
    displaynameEmitted(displayname: string) {
      this.displayname = displayname;
    }
}
