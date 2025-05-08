import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { SocketService } from "../../app/app.socket-service";
@Component({
  selector: "app-chat-sidebar-search-button",
  imports: [NgIf],
  templateUrl: "./chat-sidebar-search-button.component.html",
  styleUrl: "./chat-sidebar-search-button.component.scss",
})
export class ChatSidebarSearchButtonComponent {
  @Input() isSearch: boolean = false;
  @Output() emitClick = new EventEmitter<boolean>(); 

  onClick() {
    this.emitClick.emit();
  }
}
