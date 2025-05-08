import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-displayname-field",
  imports: [MatInputModule, MatFormFieldModule,NgIf],
  templateUrl: "./displayname-field.component.html",
  styleUrl: "./displayname-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplaynameFieldComponent {
  //Input Handling
  @Output() emitInput = new EventEmitter<string>();
  @Input() failState: boolean = false;

  InputEvent(event: Event) {
    let displayname = (event.target as HTMLInputElement).value;
    this.emitInput.emit(displayname);
  }
}
