import { Component } from "@angular/core";
import { ChatInputFieldComponent } from "../../elements/chat-input-field/chat-input-field.component";
import { ConversationComponent } from "../../elements/conversation/conversation.component";
import {
  ClientConversation,
  ClientMessage,
} from "../../../../backend/types/misc";
import { formattedMessage } from "../../elements/conversation/conversation.component";
import { SendMessageRequest } from "../../../../backend/types/ws";
import { SocketService } from "../../app/app.socket-service";
import {
  getConversationRequest,
  sendMessageRequest,
} from "../../app/app.api-handler";
import { GetConversationRequest } from "../../../../backend/types/ws";
import { Input, Output, EventEmitter } from "@angular/core";

export type Message = {
  text: string;
  receipient: string;
};
@Component({
  selector: "app-chat",
  imports: [ChatInputFieldComponent, ConversationComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  currentMessages: ClientMessage[] = [];
  private messageSent: string = "";
  private messageReceipient: string = "";
  getCurrentRecipient: () => string;
  //Placeholder conversation
  @Input() conversation: ClientConversation = {
    participants: [
      { name: "", tag: "" },
      { name: "", tag: "" },
    ],
    messages: [],
  };

  @Output() convChange = new EventEmitter<any>();

  getUserTag: () => string;
  ws: WebSocket | undefined;
  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.getUserTag = socketService.getUserTag;
    this.getCurrentRecipient = socketService.getCurrentRecipient;
  }
  //Receive Input
  async receiveInput(input: string) {
    this.messageSent = input;
    if (this.conversation !== undefined) {
      //Find the user in the conversation whos tage is not yours (receipient)
      this.messageReceipient = this.getCurrentRecipient();
    }
    // Send message request
    const response = await sendMessageRequest(
      this.ws!,
      this.messageSent,
      this.messageReceipient
    );
    this.convChange.emit();
    console.log(this.messageSent, this.messageReceipient);
  }
}
