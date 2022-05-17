import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IUser} from "../models/IUser";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = '/users'
  usersReference!: AngularFirestoreCollection<IUser>

  constructor(private fire: AngularFirestore) {
    this.usersReference = this.fire.collection(this.path)
  }

  getSearchResults(searchValue: string) {
    return this.fire.collection<IUser>(this.path, ref => ref
      .orderBy("displayName"))
      .valueChanges().pipe(map(user => user.filter(usr => {
        return usr.displayName && usr.displayName.toLowerCase().includes(searchValue.toLowerCase());
      })));
  }

  getUserData(displayName: string) {
    return this.fire.collection<IUser | undefined>(this.path, ref => ref.where('displayName', '==', `${displayName}`))
  }
}
