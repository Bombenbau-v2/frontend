import { Component } from '@angular/core';
import { ChatSidebarSearchbarComponent } from '../../elements/chat-sidebar-searchbar/chat-sidebar-searchbar.component';
import { ChatSidebarSearchButtonComponent } from '../../elements/chat-sidebar-search-button/chat-sidebar-search-button.component';
import { SocketService } from '../../app/app.socket-service';

@Component({
  selector: 'app-chat-sidebar',
  imports: [ChatSidebarSearchbarComponent, ChatSidebarSearchButtonComponent],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.scss',
})
export class ChatSidebarComponent {

  ws: WebSocket | undefined;
  waitOpen: () => Promise<boolean>;

  constructor(socketService: SocketService) {
      this.ws = socketService.socket;
      this.waitOpen = socketService.waitOpen;
    }
    
  currentInput = '';
  inputReceived(input: string) {
    this.currentInput = input;
  }

  clickReceived(isSearch: boolean) {
    if (isSearch) {
      //If the button is in search mode, do this
    } else {
      //If the button is in add mode, do this
    }
  }
}
