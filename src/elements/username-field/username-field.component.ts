import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
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
  @Output() emitInput = new EventEmitter<string>();
  //ON change, emit tag to parent
  InputEvent(event: Event){
    let usertag = (event.target as HTMLInputElement).value;
    this.emitInput.emit(usertag);
  }
}
