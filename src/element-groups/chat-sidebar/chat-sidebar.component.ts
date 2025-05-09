import { Component, Output, resolveForwardRef } from "@angular/core";
import { ChatSidebarSearchbarComponent } from "../../elements/chat-sidebar-searchbar/chat-sidebar-searchbar.component";
import { ChatSidebarSearchButtonComponent } from "../../elements/chat-sidebar-search-button/chat-sidebar-search-button.component";
import { SocketService } from "../../app/app.socket-service";
import { UserExistByTagRequest } from "../../../../backend/types/ws";
import { userExistByTag, listConversations, sendMessageRequest } from "../../app/app.api-handler";
import { setTokenSourceMapRange } from "typescript";
import shajs from "sha.js";
import { S } from "@angular/cdk/keycodes";
import { ConversationListComponent } from "../conversation-list/conversation-list.component";
import { NewConversationComponent } from "../../elements/new-conversation/new-conversation.component";
import { Conversation } from "../conversation-list/conversation-list.component";
import { EventEmitter } from "@angular/core";
import { ClientUser } from "../../../../backend/types/misc";

@Component({
  selector: "app-chat-sidebar",
  imports: [ChatSidebarSearchbarComponent, ChatSidebarSearchButtonComponent, ConversationListComponent, NewConversationComponent],
  templateUrl: "./chat-sidebar.component.html",
  styleUrl: "./chat-sidebar.component.scss",
})
export class ChatSidebarComponent {
  //current Conversations
  conversations: Conversation[] = [
    {
      displayname: "",
      usertag: "",
      lastmessagetext: "",
      lastmessagesender: "",
    },
  ];

  //Constants & Variables
  ws: WebSocket | undefined;
  public currentInput: string = "";
  tsLastCheck: NodeJS.Timeout | null = null;
  searchIs: boolean = true;
  getUserTag: () => string; 
  setCurrentRecipient: (tag: string) => void = () => {}
  //New Conversation User
  public newConversationUser: ClientUser = {name:"",tag:""};

  //Output
  @Output() emitConversationRequest = new EventEmitter<string>;

  //Get Websocket
  constructor(socketService: SocketService) {
    this.ws = socketService.socket;
    this.getUserTag = socketService.getUserTag;
    this.setCurrentRecipient = socketService.setCurrentRecipient;
  }

  async ngOnInit() {
    this.conversations = await this.listFormattedConversations();
  }

  //With a delay of checkDelay, request a user with the tag same as the search option and update conversations list
  async inputReceived(input: string) {
    this.currentInput = input;
    if (this.tsLastCheck !== null) {
      clearTimeout(this.tsLastCheck);
    }
    this.tsLastCheck = setTimeout(async () => {
      //Update conversations list to filter to input
      this.conversations = await this.listFilteredConversations(this.currentInput);
      if (
        //check if user is already in conversations list: if not, check user exisetence
        !this.conversations.some((e) => e.usertag.toLocaleLowerCase() == this.currentInput.toLocaleLowerCase())
      ) {
        //Check user exisetence
        const response = await userExistByTag(this.ws!, this.currentInput);
        if (response.exists) {
          this.searchIs = false;
          this.newConversationUser = response.user!;
        } else {
          this.searchIs = true;
        }
      }
    }, 300);
  }

  //Click logic
  async clickReceived(
  ){
     if (this.newConversationUser.tag !==""){
      const response = await sendMessageRequest(this.ws!,"OPEN_CONVERSATION",this.newConversationUser.tag);
      if (response.success){
        this.setCurrentRecipient(this.newConversationUser.tag);
        this.searchIs = true;
        this.emitConversationRequest.emit(this.newConversationUser.tag);
        this.conversations  = await this.listFilteredConversations(this.currentInput);	
      }
     }
    
  }

  //Conversation Click Logic
  conversationClickReceived(userTag: string){
    this.emitConversationRequest.emit(userTag);
  }

  //Filter list of conversations down to only those including the search query
  listFilteredConversations = async (filter: string): Promise<Conversation[]> => {
    let fullConversations = await this.listFormattedConversations();
    let filteredConversations = fullConversations.filter((e) => e.usertag.toLowerCase().includes(filter.toLowerCase()) || e.displayname.toLowerCase().includes(filter.toLowerCase()));
    return filteredConversations;
  };

  //Convert request array to my array
  listFormattedConversations = async (): Promise<Conversation[]> => {
    const response = await listConversations(this.ws!);
    let returnConversation: Conversation[] = [];
    //Build conversation array
    if (response.success) {
      for (const conversation of response.conversations) {
        //Add new value
        returnConversation.push({
          displayname: conversation.participant.name,
          usertag: conversation.participant.tag,
          lastmessagetext: conversation.lastMessage?.text,
          lastmessagesender: conversation.lastMessage?.sender.tag,
        });
      }
      return returnConversation;
    } else {
      //In case of error, give error stuff
      return [
        {
          displayname: "ERROR",
          usertag: "An internal error has occured.",
          lastmessagesender: "ERROR",
          lastmessagetext: ":(",
        },
      ];
    }
  };
}
