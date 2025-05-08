import { Component, Input } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";

type Conversation = {
  displayname: string;
  usertag: string;
};

@Component({
  selector: "app-conversation-list",
  imports: [NgFor, NgIf],
  templateUrl: "./conversation-list.component.html",
  styleUrl: "./conversation-list.component.scss",
})
export class ConversationListComponent {
  //If the element is disabled
  @Input() enabled: boolean = true;
  //current Conversations
  conversations: Conversation[] = [
    {
      displayname: "man1",
      usertag: "blablabla",
    },
    {
      displayname: "man2",
      usertag: "wuuwuruer",
    },
    {
      displayname: "man3",
      usertag: "fasdfasd",
    },
    {
      displayname: "man35",
      usertag: "asdasd",
    },
    {
      displayname: "man4",
      usertag: "exampletag1",
    },
    {
      displayname: "man5",
      usertag: "exampletag2",
    },
    {
      displayname: "man6",
      usertag: "exampletag3",
    },
    {
      displayname: "man7",
      usertag: "exampletag4",
    },
    {
      displayname: "man8",
      usertag: "exampletag5",
    },
    {
      displayname: "man9",
      usertag: "newtag1",
    },
    {
      displayname: "man10",
      usertag: "newtag2",
    },
    {
      displayname: "man11",
      usertag: "newtag3",
    },
    {
      displayname: "man12",
      usertag: "newtag4",
    },
    {
      displayname: "man13",
      usertag: "newtag5",
    },
    {
      displayname: "man14",
      usertag: "newtag6",
    }
  ];
}
