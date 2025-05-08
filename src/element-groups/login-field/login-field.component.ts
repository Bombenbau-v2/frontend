import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {UsernameFieldComponent} from "../../elements/username-field/username-field.component";
import {PasswordFieldComponent} from "../../elements/password-field/password-field.component";
import {CredentialsEnterButtonComponent} from "../../elements/credentials-enter-button/credentials-enter-button.component";
import {login, userExistByTag} from "../../app/app.api-handler";
import shajs from "sha.js";
import {SocketService} from "../../app/app.socket-service";
import {Router} from "@angular/router";

@Component({
	selector: "app-login-field",
	imports: [UsernameFieldComponent, PasswordFieldComponent, CredentialsEnterButtonComponent],
	templateUrl: "./login-field.component.html",
	styleUrl: "./login-field.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFieldComponent {
	private usertag = "";
	private userpassword = "";
	private router = inject(Router);

	ws: WebSocket | undefined;
	isOpen: () => boolean;
	waitOpen: () => Promise<boolean>;

	constructor(socketService: SocketService) {
		this.ws = socketService.socket;
		this.isOpen = socketService.isOpen;
		this.waitOpen = socketService.waitOpen;
	}

	async buttonClicked() {
		// Hash the password
		const passwordHash = shajs("sha256").update(this.userpassword).digest("hex").toUpperCase();

		// Ensure websocket is open
		await this.waitOpen();

		// Send login request
		const response = await login(this.ws!, this.usertag, passwordHash);

		console.log("Login", response.success ? "successful" : "failed");
	}

	//Emitted usertag and password from Input fields
	usertagEmitted(usertag: string) {
		this.usertag = usertag;
	}
	passwordEmitted(password: string) {
		this.userpassword = password;
	}
}
