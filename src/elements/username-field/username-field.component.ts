import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-username-field',
  imports: [MatInputModule, MatFormFieldModule,NgIf],
  templateUrl: './username-field.component.html',
  styleUrl: './username-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsernameFieldComponent {
  @Output() emitInput = new EventEmitter<string>();
  @Input() failState: boolean = false;
  //ON change, emit tag to parent
  InputEvent(event: Event){
    let usertag = (event.target as HTMLInputElement).value;
    this.emitInput.emit(usertag);
  }
}
