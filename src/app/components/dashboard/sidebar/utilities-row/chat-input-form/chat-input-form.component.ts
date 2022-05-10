import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NbTagComponent, NbTagInputAddEvent} from "@nebular/theme";
import {ChatroomService} from "../../../../../services/chatroom.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../auth/auth.service";

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
  ) {
    this.form = fb.group({
      name: null,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

  users: Set<string> = new Set<string>();

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.users.delete(tagToRemove.text);
  }

  onTagAdd({value, input}: NbTagInputAddEvent): void {
    if (value) {
      this.users.add(value)
    }
    input.nativeElement.value = '';
  }

  create() {
    const chatroom = this.form.value;
    chatroom.userIds = [];
    chatroom.userIds!.push(this.authService.getLoggedUser.uid);
    // chatroom.users = [...this.users].map(user => user.uid)
    this.chatRoomService.create({...chatroom}).then((res) => this.router.navigate(['dashboard', res.id]));
  }
}
