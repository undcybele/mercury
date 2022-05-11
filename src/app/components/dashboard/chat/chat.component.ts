import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatroomService} from "../../../services/chatroom.service";
import {Observable} from "rxjs";
import {IChatRoom} from "../../../models/IChatRoom";
import {MessageService} from "../../../services/message.service";
import {IMessage, MessageType} from "../../../models/IMessage";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chatRoomId!: string | null;
  chatRoom$ = new Observable<IChatRoom | undefined>();
  messages$ = new Observable<(IMessage | undefined)[]>()
  messages: Array<IMessage | undefined> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatRoomService: ChatroomService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.chatRoomId = data['chatRoomId']
      this.chatRoom$ = this.chatRoomService.getChatRoom(this.chatRoomId!).valueChanges();
      // this.messageService.getMessages(this.chatRoomId!).valueChanges().pipe(take(500)).subscribe(res => {
      //   this.messages = res;
      // })
      this.messages$ = this.messageService.getMessages(this.chatRoomId!).valueChanges().pipe()
      }
    )
  }

  sendMessage(event: { files: any[]; message: any; }) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    const newMessage: IMessage = {
      text: event.message,
      date: Date.now(),
      files: files,
      type: files.length ? MessageType.Image : MessageType.Text,
      senderId: this.authService.getLoggedUser.uid,
      chatRoomId: this.chatRoomId!,
      user: {
        name: this.authService.getLoggedUser.displayName || "Unknown user",
        avatar: this.authService.getLoggedUser.photoURL!
      }
    }
    this.messageService.send(newMessage).then()
  }
}
