import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-displayname-field',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './displayname-field.component.html',
  styleUrl: './displayname-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplaynameFieldComponent {

}
