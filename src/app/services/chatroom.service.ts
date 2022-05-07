import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IChatRoom} from "../models/IChatRoom";
import {IUser} from "../models/IUser";


@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private path = '/chatroom'
  chatsReference!: AngularFirestoreCollection<IChatRoom>

  constructor(private fire: AngularFirestore) {
    this.chatsReference = this.fire.collection(this.path)
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
