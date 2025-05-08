import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { PasswordFieldComponent } from "../../elements/password-field/password-field.component";
import { UsernameFieldComponent } from "../../elements/username-field/username-field.component";
import { CredentialsEnterButtonComponent } from "../../elements/credentials-enter-button/credentials-enter-button.component";
import { DisplaynameFieldComponent } from "../../elements/displayname-field/displayname-field.component";
import { waitForMessage, login, register } from "../../app/app.api-handler";
import shajs from "sha.js";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { SocketService } from "../../app/app.socket-service";

@Component({
  selector: "app-registration-field",
  imports: [
    PasswordFieldComponent,
    UsernameFieldComponent,
    CredentialsEnterButtonComponent,
    DisplaynameFieldComponent,
  ],
  templateUrl: "./registration-field.component.html",
  styleUrl: "./registration-field.component.scss",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationFieldComponent {
  private router = inject(Router);
  private displayname = "";
  private usertag = "";
  private userpassword = "";
  failMessage = "";
  successMessage = "";
  displayFail: boolean = false;
  passwordFail: boolean = false;
  usertagFail: boolean = false;

  ws: WebSocket | undefined;
  isOpen: () => boolean;
  waitOpen: () => Promise<boolean>;

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.isOpen = socketService.isOpen;
    this.waitOpen = socketService.waitOpen;
  }

  //Button click logic
  async buttonClicked() {
    //Convert password to hash
    const userhash = shajs("sha256")
      .update(this.userpassword)
      .digest("hex")
      .toUpperCase();
    //Register Request
    const registerResponse = await register(
      this.displayname,
      this.usertag,
      userhash
    );
    if (!registerResponse.success) {
      switch (registerResponse.error) {
        case "malformed_hash": {
          this.failMessage =
            "Registration failed: an internal error has occured.";
          this.displayFail = false;
          this.passwordFail = false;
          this.usertagFail = false;
          break;
        }
        case "no_special_characters": {
          this.failMessage =
            "Registration failed: forbidden characters <br>Display Name: only _ or -, letters, numbers and whitespace. <br>User Tag: only _ or -, letters, numbers).";
          this.displayFail = true;
          this.passwordFail = true;
          this.usertagFail = true;
          break;
        }
        case "missing_fields": {
          this.failMessage = "Registration failed: fields left empty.";
          this.displayFail = true;
          this.passwordFail = true;
          this.usertagFail = true;
          break;
        }
        case "tag_used": {
          this.failMessage =
            "Registration failed: this user tag is already used.";
          this.displayFail = false;
          this.passwordFail = false;
          this.usertagFail = true;
          break;
        }
        default: {
          this.failMessage =
            "Registration failed: An unknown error has occured.";
        }
      }
    } else {
      this.displayFail = false;
      this.passwordFail = false;
      this.usertagFail = false;
      this.successMessage = "Registration successful, logging in...";
      this.failMessage = "";
      
      // Hash the password once again
      const passwordHash = shajs("sha256")
        .update(this.userpassword)
        .digest("hex")
        .toUpperCase();
      // Ensure websocket is open
      await this.waitOpen();
      // Send login request
      const response = await login(this.ws!, this.usertag, passwordHash);
      console.log("Login", response.success ? "successful" : "failed");
      if (response.success) {
        this.router.navigate(["/chat"]);
      } else {
        this.successMessage = "";
        this.failMessage = "Login failed: please go to /login and try again.";
      }
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
