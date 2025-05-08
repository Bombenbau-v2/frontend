import { Component } from '@angular/core';
import { ChatComponent } from "../../element-groups/chat/chat.component";
import { ChatSidebarComponent } from "../../element-groups/chat-sidebar/chat-sidebar.component";

@Component({
  selector: 'app-chat-page',
  imports: [ChatComponent, ChatSidebarComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {

} 
