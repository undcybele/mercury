import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IUser} from "../models/IUser";
import {IMessage} from "../models/IMessage";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = '/users'
  usersReference!: AngularFirestoreCollection<IUser>

  constructor(private fire: AngularFirestore) {
    this.usersReference = this.fire.collection(this.path)
  }

  getUserData(displayName: string) {
    return this.fire.collection<IUser | undefined>(this.path, ref => ref.where('displayName', '==', `${displayName}`))
  }

  getAllChatRoomsForUser(user: IUser) {
    //assert local user
    //load all chat rooms by id
    //return an array
  }

}
