import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatroomService} from "../../../services/chatroom.service";
import {finalize, Observable, tap} from "rxjs";
import {IChatRoom} from "../../../models/IChatRoom";
import {MessageService} from "../../../services/message.service";
import {IMessage, MessageType} from "../../../models/IMessage";
import {AuthService} from "../../../auth/auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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
    private authService: AuthService,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
        this.chatRoomId = data['chatRoomId']
        this.chatRoom$ = this.chatRoomService.getChatRoom(this.chatRoomId!).valueChanges();
      this.messages$ = this.messageService.getMessages(this.chatRoomId!).valueChanges();
      }
    )
  }

  createMessage(message: string, files: any) {
    const newMessage: IMessage = {
      text: message,
      date: Date.now(),
      files: files,
      type: files.length ? MessageType.Image : MessageType.Text,
      senderId: this.authService.currentUser.uid,
      chatRoomId: this.chatRoomId!,
      user: {
        name: this.authService.currentUser.displayName || "Unknown user",
        avatar: this.authService.currentUser.photoURL!
      }
    }
    this.messageService.send(newMessage).then()
  }

  sendMessage(event: { files: any[]; message: any; }) {
    if (event.files.length === 0) {
      this.createMessage(event.message, [])
    } else {
      event.files.forEach((file) => {
        const id = Date.now()
        const filePath = `${this.chatRoomId!}/${id}`
        const ref = this.storage.ref(filePath)
        this.storage.upload(filePath, file).snapshotChanges().pipe(finalize(() => {
          ref.getDownloadURL().pipe(
            tap((data) => {
              let f = [{url: data, type: file.type, icon: 'file-text-outline'}]
              this.createMessage(event.message, f)
            })).subscribe()
        })).subscribe()
      });
    }
  }
}
