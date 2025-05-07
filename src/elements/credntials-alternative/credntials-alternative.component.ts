import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credentials-alternative',
  imports: [],
  templateUrl: './credntials-alternative.component.html',
  styleUrl: './credntials-alternative.component.scss'
})
export class CredntialsAlternativeComponent {
  @Input() operation = "";
  @Input() text = "";
  @Input() url = "";
}
