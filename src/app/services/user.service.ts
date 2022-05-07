import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IUser} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = '/users'
  usersReference!: AngularFirestoreCollection<IUser>

  constructor(private fire: AngularFirestore) {
    this.usersReference = this.fire.collection(this.path)
  }

  getUserData(user: IUser) {
    //load all data
    //return it
  }

  getAllChatRoomsForUser(user: IUser) {
    //assert local user
    //load all chat rooms by id
    //return an array
  }

}
