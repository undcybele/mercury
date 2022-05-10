import {Component, OnInit} from '@angular/core';
import {IChatRoom} from "../../../../models/IChatRoom";
import {ChatroomService} from "../../../../services/chatroom.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/auth.service";
import {Router} from "@angular/router";
import {IUser} from "../../../../models/IUser";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Array<{ name: string }> = [{name: "Nicoleta"}, {name: "Larisa"}, {name: "Ana"}]
  chatRooms$ = new Observable<IChatRoom[]>();
  chatRooms: Array<IChatRoom> | null = null;

  constructor(
    private chatRoomService: ChatroomService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.chatRooms$ = this.chatRoomService.getChatRooms(this.authService.getLoggedUser.uid);
  }

  redirect(cr: IChatRoom) {
    this.router.navigate(['dashboard', cr.uid]).then()
  }

}
