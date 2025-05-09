import { Component, EventEmitter, Input,Output } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { SocketService } from "../../app/app.socket-service";

export type Conversation = {
  displayname: string;
  usertag: string;
  lastmessagetext?: string;
  lastmessagesender?: string;
};

@Component({
  selector: "app-conversation-list",
  imports: [NgFor, NgIf],
  templateUrl: "./conversation-list.component.html",
  styleUrl: "./conversation-list.component.scss"
})


export class ConversationListComponent {
  //If the element is disabled
  @Input() enabled: boolean = true;
  @Input() conversations: Conversation[] = [];
  @Output() convEmitter = new EventEmitter<string>;

  ws: WebSocket | undefined;
  waitOpen: () => Promise<boolean>;

  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.waitOpen = socketService.waitOpen;
  }

  onClick(conv: Conversation){
    this.convEmitter.emit(conv.usertag);
  }
}
