import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NbTagComponent, NbTagInputAddEvent} from "@nebular/theme";
import {ChatroomService} from "../../../../../services/chatroom.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../auth/auth.service";
import {Observable, take} from "rxjs";
import {IUser} from "../../../../../models/IUser";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-chat-input-form',
  templateUrl: './chat-input-form.component.html',
  styleUrls: ['./chat-input-form.component.css']
})
export class ChatInputFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private chatRoomService: ChatroomService,
    private router: Router,
    private authService: AuthService,
    private usersService: UserService
  ) {
    this.form = fb.group({
      name: null,
    });
  }

  ngOnInit(): void {
  }

  tags: Set<string> = new Set<string>();
  userIds: Set<string> = new Set<string>()
  users$ = new Observable<(IUser | undefined)[]>()

  addUser({value, input}: NbTagInputAddEvent) {
    let newUser!: IUser
    this.users$ = this.usersService.getUserData(value).valueChanges()
    console.log(this.users$)
    this.userIds.add(newUser!.uid)
    this.tags.add(newUser!.displayName)

    input.nativeElement.value = ''
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    //this.users.delete(tagToRemove)
  }

  create() {
    if(this.userIds.size){
      const chatroom = this.form.value;
      chatroom.userIds = [];
      chatroom.userIds!.push(this.authService.getLoggedUser.uid);
      chatroom.userIds!.concat(this.userIds)
      this.chatRoomService.create({...chatroom}).then((res) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['dashboard', res.id]));
      });
    }
  }
}
