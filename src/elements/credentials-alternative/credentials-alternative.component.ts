import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credentials-alternative',
  imports: [],
  templateUrl: './credentials-alternative.component.html',
  styleUrl: './credentials-alternative.component.scss'
})
export class CredentialsAlternativeComponent {
  @Input() operation = "";
  @Input() text = "";
  @Input() url = "";
}
