import { Component } from "@angular/core";
import { RegistrationFieldComponent } from "../../element-groups/registration-field/registration-field.component";
import { CredntialsAlternativeComponent } from "../../elements/credntials-alternative/credntials-alternative.component";

@Component({
  selector: "app-registration-page",
  imports: [RegistrationFieldComponent, CredntialsAlternativeComponent],
  templateUrl: "./registration-page.component.html",
  styleUrl: "./registration-page.component.scss",
})
export class RegistrationPageComponent {}
