import { Component,Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-conversation',
  imports: [NgIf],
  templateUrl: './new-conversation.component.html',
  styleUrl: './new-conversation.component.scss'
})
export class NewConversationComponent {
  @Input() userTag: string = "blablabla";
  @Input() displayName: string = "test";
  @Input() enabled: boolean = false;
}
