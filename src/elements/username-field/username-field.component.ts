import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-username-field',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './username-field.component.html',
  styleUrl: './username-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameFieldComponent {
  @Output() enterClickEvent = new EventEmitter<string>();
  emitDisplayName(usertag: string) {
    this.enterClickEvent.emit(usertag);
  }
}
