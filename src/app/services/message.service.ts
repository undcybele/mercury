import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IMessage} from "../models/IMessage";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private path = '/messages'
  messagesReference!: AngularFirestoreCollection<IMessage>;

  constructor(private fire: AngularFirestore) {
    this.messagesReference = this.fire.collection(this.path);
  }

  sendMessage(message: IMessage, chatRoomId: string) {
    // chatroomService -> chatroom
    // add message to chatroom array of messages
    // send it back
    return this.messagesReference.doc(chatRoomId);
  }
}
