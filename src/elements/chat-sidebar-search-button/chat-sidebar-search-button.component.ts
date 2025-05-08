import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-chat-sidebar-search-button',
  imports: [],
  templateUrl: './chat-sidebar-search-button.component.html',
  styleUrl: './chat-sidebar-search-button.component.scss'
})
export class ChatSidebarSearchButtonComponent {
  @Input() isSearch: boolean = false;
  @Output() emitClick = new EventEmitter<boolean>;

  imgSrc =  "../../assets/icons/" + this.isSearch ? "search.svg" : "person_add.svg";

  onClick() {
    this.emitClick.emit(this.isSearch);
  }
}
