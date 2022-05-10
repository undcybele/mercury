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

  send(message: IMessage) {
    return this.messagesReference.add({...message});
  }

  getMessages(chatRoomId: string) {
    return this.fire.collection<IMessage | undefined>(this.path, ref => ref.orderBy('date', 'asc').where('chatRoomId', '==', `${chatRoomId}`))
  }
}
