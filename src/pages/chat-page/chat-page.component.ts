import { Component } from "@angular/core";
import { ChatComponent } from "../../element-groups/chat/chat.component";
import { ChatSidebarComponent } from "../../element-groups/chat-sidebar/chat-sidebar.component";
import { SocketService } from "../../app/app.socket-service";
import { getConversationRequest } from "../../app/app.api-handler";
import { GetConversationResponse } from "../../../../backend/types/ws";
import { Conversation } from "../../element-groups/conversation-list/conversation-list.component";
import { ClientConversation } from "../../../../backend/types/misc";
import { last } from "rxjs";

@Component({
  selector: "app-chat-page",
  imports: [ChatComponent, ChatSidebarComponent],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.scss",
})
export class ChatPageComponent {
  conversation: ClientConversation = {
    participants: [
      { name: "", tag: "" },
      { name: "", tag: "" },
    ],
    messages: [],
  };
  lastUserTag: string = "";
  ws: WebSocket | undefined;
  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
  }

  async conversationChanged(){
    const response = await getConversationRequest(this.ws!, this.lastUserTag);
    if (response.success) {
      if (response.conversation !== undefined) {
        this.conversation = response.conversation;
      }
  }
}
  async conversationClicked(userTag: string) {
    const response = await getConversationRequest(this.ws!, userTag);
    if (response.success) {
      if (response.conversation !== undefined) {
        this.conversation = response.conversation;
        this.lastUserTag = userTag;
      }
    }
  }
}
