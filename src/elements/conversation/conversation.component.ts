import { Component, Input } from "@angular/core";
import { NgFor } from "@angular/common";
import { ClientConversation, ClientMessage } from "../../../../backend/types/misc";
import { SocketService } from "../../app/app.socket-service";
import { SimpleChanges } from "@angular/core";
import { ClientUser } from "../../../../backend/types/misc";

export type formattedMessage = {
  sender: string;
  senderTag: string;
  text: string;
  time: string;
};

@Component({
  selector: "app-conversation",
  imports: [NgFor],
  templateUrl: "./conversation.component.html",
  styleUrl: "./conversation.component.scss",
})

export class ConversationComponent {
  ws: WebSocket | undefined;
  getUserTag: () => string; 

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.getUserTag = socketService.getUserTag;
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
    this.currentMessages = [];
    this.receipient = this.conversation.participants.find((participant) => participant.tag !== this.getUserTag())!;
    for (const message of this.conversation.messages) {
      this.currentMessages.push(this.formatMessage(message));
    }
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
