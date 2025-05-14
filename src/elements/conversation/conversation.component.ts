import { Component, Input } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { ClientConversation, ClientMessage } from "../../../../backend/types/misc";
import { SocketService } from "../../app/app.socket-service";
import { SimpleChanges } from "@angular/core";
import { ClientUser } from "../../../../backend/types/misc";
import { NewMessageNotification } from "../../../../backend/types/notify";
import { getConversationRequest } from "../../app/app.api-handler";

export type formattedMessage = {
  sender: string;
  senderTag: string;
  text: string;
  time: string;
};

@Component({
  selector: "app-conversation",
  imports: [NgFor,NgIf],
  templateUrl: "./conversation.component.html",
  styleUrl: "./conversation.component.scss",
})
export class ConversationComponent {
  ws: WebSocket | undefined;
  getUserTag: () => string;
  getCurrentRecipient: () => string;
  conversationOpen: boolean = false;
  currentRecipient: string = "";

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.getUserTag = socketService.getUserTag;
    this.ws.addEventListener("message", (event) => this.newMessage(event));
    this.getCurrentRecipient = socketService.getCurrentRecipient;
  }

  @Input() conversation: ClientConversation = {
    participants: [
      { name: "", tag: "" },
      { name: "", tag: "" },
    ],
    messages: [],
  };
  receipient: Partial<ClientUser> = {};
  currentMessages: formattedMessage[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if(this.conversation.participants.find((participant) => participant.tag === this.getCurrentRecipient())!.tag !== ""){
      this.conversationOpen = true;
      this.currentRecipient = this.getCurrentRecipient();
      console.log(this.conversationOpen + this.currentRecipient);
    }
    this.currentMessages = [];
    this.receipient = this.conversation.participants.find((participant) => participant.tag !== this.getUserTag())!;
    for (const message of this.conversation.messages) {
    this.currentMessages.push(this.formatMessage(message));
    }
  }

  newMessage(event: MessageEvent) {
    try {
      //Handle JSON data
      const data = JSON.parse(event.data) as NewMessageNotification;
      if (data.notify === "new_message") {
        if(data.conversation !== this.getCurrentRecipient()){
          return;
        }
        this.currentMessages.push(this.formatMessage(data.message));
      }
    } catch {}
  }

  //formattiere messagie zu menschlich lesbar
  formatMessage(message: ClientMessage): formattedMessage {
    return {
      sender: message.sender.name,
      senderTag: message.sender.tag,
      text: message.text,
      time: new Date(message.sentAt).toLocaleString("de-DE"),
    };
  }
}
