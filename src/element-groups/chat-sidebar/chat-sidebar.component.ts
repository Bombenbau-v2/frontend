import { Component } from "@angular/core";
import { ChatSidebarSearchbarComponent } from "../../elements/chat-sidebar-searchbar/chat-sidebar-searchbar.component";
import { ChatSidebarSearchButtonComponent } from "../../elements/chat-sidebar-search-button/chat-sidebar-search-button.component";
import { SocketService } from "../../app/app.socket-service";
import { UserExistByTagRequest } from "../../../../backend/types/ws";
import { userExistByTag, login } from "../../app/app.api-handler";
import { setTokenSourceMapRange } from "typescript";
import shajs from "sha.js";
import { S } from "@angular/cdk/keycodes";

@Component({
  selector: "app-chat-sidebar",
  imports: [ChatSidebarSearchbarComponent, ChatSidebarSearchButtonComponent],
  templateUrl: "./chat-sidebar.component.html",
  styleUrl: "./chat-sidebar.component.scss",
})
export class ChatSidebarComponent {
  //Constants & Variables
  ws: WebSocket | undefined;
  waitOpen: () => Promise<boolean>;
  currentInput: string = "";
  tsLastCheck: NodeJS.Timeout | null = null;
  searchIs: boolean = true;

  //Get Websocket
  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.waitOpen = socketService.waitOpen;
  }

  //With a delay of checkDelay, request a user with the tag same as the search option
  async inputReceived(input: string) {
    this.currentInput = input;
    if (this.tsLastCheck !== null) {
      clearTimeout(this.tsLastCheck);
    }
    this.tsLastCheck = setTimeout(async () => {

      const response = await userExistByTag(this.ws!, this.currentInput);
      if (response.exists) {
        this.searchIs = false;
      }else {
        this.searchIs = true;
      }
    }, 300);
  }

  //Click logic
  clickReceived() {
  }
}
