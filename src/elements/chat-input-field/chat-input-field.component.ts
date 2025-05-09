import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ChatEnterButtonComponent } from "../chat-enter-button/chat-enter-button.component";
import { Message } from "../../element-groups/chat/chat.component";

@Component({
  selector: "app-chat-input-field",
  imports: [ChatEnterButtonComponent],
  templateUrl: "./chat-input-field.component.html",
  styleUrl: "./chat-input-field.component.scss",
})
export class ChatInputFieldComponent {
  private input = "";
  @Output() inputEmitter = new EventEmitter<string>();
  //Change input value when there is an input
  InputEvent(event: Event) {
    this.input = (event.target as HTMLInputElement).value;
  }
  //Emit current input upon button press
  sendMessage() {
    this.inputEmitter.emit(this.input);
  }
}
