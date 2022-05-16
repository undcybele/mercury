import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IChatRoom} from "../models/IChatRoom";
import {IUser} from "../models/IUser";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private path = '/chatroom'
  chatsReference!: AngularFirestoreCollection<IChatRoom>

  constructor(private fire: AngularFirestore) {
    this.chatsReference = this.fire.collection(this.path)
  }


  create(chatRoom: IChatRoom) {
    return this.chatsReference.add({...chatRoom});
  }

  getChatRooms(userId: string) {
    return this.fire.collection<IChatRoom>(this.path, ref => ref.where('userIds', 'array-contains', `${userId}`)).snapshotChanges().pipe(map(a => a.map(cr => {
      const chatRoom: IChatRoom = cr.payload.doc.data();
      chatRoom.uid = cr.payload.doc.id;
      return chatRoom;
    })))
  }

  getChatRoom(chatRoomId: string) {
    return this.fire.collection<IChatRoom>(this.path).doc(chatRoomId);
  }
}
