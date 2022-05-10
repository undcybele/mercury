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

  createChatRoom(invitedUser: IUser) {

    //create chat room
    //initialize everything
    //add local user + invited User ids to list of users
    //publish
    //return chatroom
  }

  addUserToChatRoom(invitedUser: IUser, chatroomId: String) {
    //check invited user exists
    //check invited user not in chat room already
    //add user
  }

  getMessages(chatroomId: String) {
    //get latest x messages
    //display them inversely chronologically
  }
}
