import { Component } from "@angular/core";
import { RegistrationFieldComponent } from "../../element-groups/registration-field/registration-field.component";
import { CredentialsAlternativeComponent } from "../../elements/credentials-alternative/credentials-alternative.component";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationFieldComponent, CredentialsAlternativeComponent],
  templateUrl: "./registration-page.component.html",
  styleUrl: "./registration-page.component.scss",
})
export class RegistrationPageComponent {}
