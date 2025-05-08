import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-chat-enter-button',
  imports: [],
  templateUrl: './chat-enter-button.component.html',
  styleUrl: './chat-enter-button.component.scss'
})
export class ChatEnterButtonComponent {

  @Output() buttonClickEmitter = new EventEmitter<any>;
  onClick () {
    this.buttonClickEmitter.emit();
  }
}
