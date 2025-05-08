import { Component } from '@angular/core';
import { ChatInputFieldComponent } from "../../elements/chat-input-field/chat-input-field.component";

@Component({
  selector: 'app-chat',
  imports: [ChatInputFieldComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private messageSent: string = "";

  receiveInput(input: string){
    this.messageSent = input;
    console.log(this.messageSent);
  }

}
