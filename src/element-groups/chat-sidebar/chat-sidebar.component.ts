import { Component } from '@angular/core';
import { ChatSidebarSearchbarComponent } from '../../elements/chat-sidebar-searchbar/chat-sidebar-searchbar.component';
import { ChatSidebarSearchButtonComponent } from '../../elements/chat-sidebar-search-button/chat-sidebar-search-button.component';

@Component({
  selector: 'app-chat-sidebar',
  imports: [ChatSidebarSearchbarComponent, ChatSidebarSearchButtonComponent],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.scss',
})
export class ChatSidebarComponent {
  currentInput = '';
  inputReceived(input: string) {
    this.currentInput = input;
  }
  clickReceived(isSearch: boolean) {
    if (isSearch) {
      
    } else {
      
    }
  }
}
