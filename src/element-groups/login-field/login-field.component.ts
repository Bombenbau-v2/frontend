import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { UsernameFieldComponent } from "../../elements/username-field/username-field.component";
import { PasswordFieldComponent } from "../../elements/password-field/password-field.component";
import { CredentialsEnterButtonComponent } from "../../elements/credentials-enter-button/credentials-enter-button.component";
import { login, userExistByTag } from "../../app/app.api-handler";
import shajs from "sha.js";
import { SocketService } from "../../app/app.socket-service";
import { Router } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";

@Component({
  selector: "app-login-field",
  imports: [
    UsernameFieldComponent,
    PasswordFieldComponent,
    CredentialsEnterButtonComponent,
  ],
  templateUrl: "./login-field.component.html",
  styleUrl: "./login-field.component.scss",
})
export class LoginFieldComponent {
  private usertag = "";
  private userpassword = "";
  private setUserTag: (tag: string) => void;
  private router = inject(Router);
  failMessage = "";
  successMessage = "";
  passwordFail: boolean = false;
  usertagFail: boolean = false;

  ws: WebSocket | undefined;
  isOpen: () => boolean;
  waitOpen: () => Promise<boolean>;

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.isOpen = socketService.isOpen;
    this.waitOpen = socketService.waitOpen;
	this.setUserTag = socketService.setUserTag;
  }

  async buttonClicked() {
    // Hash the password
    const passwordHash = shajs("sha256")
      .update(this.userpassword)
      .digest("hex")
      .toUpperCase();

    // Ensure websocket is open
    await this.waitOpen();

    // Send login request
    const response = await login(this.ws!, this.usertag, passwordHash);

    console.log("Login", response.success ? "successful" : "failed");
    //On success, display login and redirect to chat
    if (response.success) {
      this.successMessage = "Logging in...";
      this.failMessage = "";
      this.passwordFail = false;
      this.usertagFail = false;
	  this.setUserTag(this.usertag);
      setTimeout(() => this.router.navigate(["/chat"]), 600);
    } else if (response.error) {
      switch (response.error) {
        case "missing_fields": {
          this.failMessage =
            "Login failed: password or tag missing. <br> Please fill in & try again.";
          this.usertagFail = true;
		  this.passwordFail = true;
          break;
        }

        case "malformed_hash": {
          this.failMessage =
            "Login failed: an internal error has occured. <br> Please refresh in & try again.";
          this.usertagFail = false;
          this.passwordFail = false;
          break;
        }

        case "user_not_found": {
          this.failMessage =
            "Login failed: this user does not exist.<br> Please correct & try again or register.";
          this.usertagFail = true;
		  this.passwordFail = false;
          break;
        }

        case "wrong_password": {
          this.failMessage =
            "Login failed: wrong password.<br> Please correct & try again.";
          this.usertagFail = false;
		  this.passwordFail = true;
          break;
        }
        default: {
          this.failMessage =
            "Login failed: an unknown error has occured.<br> Please refresh & try again.";
          this.usertagFail = false;
		  this.passwordFail = false;
          break;
        }
      }
    } else {
      this.failMessage =
        "Login failed: an unknown error has occured. <br> Please refresh & try again.";
      this.passwordFail = false;
      this.usertagFail = false;
    }
  }

  ngOnInit() {
  // Access route parameter
	
	if(this.router.url === "/login/unauthorized"){
		this.failMessage = "Unauthorized: You have been redirected. Please log in.";
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
