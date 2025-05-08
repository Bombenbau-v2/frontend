import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-chat-sidebar-searchbar",
  imports: [],
  templateUrl: "./chat-sidebar-searchbar.component.html",
  styleUrl: "./chat-sidebar-searchbar.component.scss",
})
export class ChatSidebarSearchbarComponent {
  @Output() inputEmitter = new EventEmitter<string>();

  inputReceived(event: Event) {
    this.inputEmitter.emit((event.target as HTMLInputElement).value);
  }
}
