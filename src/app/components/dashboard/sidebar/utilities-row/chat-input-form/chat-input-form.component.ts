import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NbTagComponent, NbToastrService} from "@nebular/theme";
import {ChatroomService} from "../../../../../services/chatroom.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../auth/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../../../../models/IUser";
import {UserService} from "../../../../../services/user.service";
import {showToast} from "../../../../../utils/toast";

@Component({
  selector: 'app-chat-input-form',
  templateUrl: './chat-input-form.component.html',
  styleUrls: ['./chat-input-form.component.css']
})
export class ChatInputFormComponent implements OnInit {
  form!: FormGroup;
  foundUsers$: Observable<IUser[]> | null = null;

  constructor(
    private fb: FormBuilder,
    private chatRoomService: ChatroomService,
    private router: Router,
    private authService: AuthService,
    private usersService: UserService,
    private toastService: NbToastrService,
  ) {
    this.form = fb.group({
      name: null,
      searchValue: ''
    });
  }

  ngOnInit(): void {
  }

  names: Set<string> = new Set<string>();
  userIds: Set<string> = new Set<string>()
  users$ = new Observable<(IUser | undefined)[]>()

  addUser(user: IUser) {
    this.userIds.add(user.uid)
    this.names.add(user.displayName)
    this.form.value.searchValue = ''
    showToast(this.toastService, "Chat mate added successfully", "Yay friends!", 'success')
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.names.delete(tagToRemove.text)
  }

  create() {
    if (this.userIds.size) {
      const chatroom = this.form.value;
      chatroom.userIds = [];
      chatroom.userIds.push();
      chatroom.userIds = [...this.userIds, this.authService.uid]
      this.chatRoomService.create({...chatroom}).then((res) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['dashboard', res.id]));
      });
    }
  }

  searchUsers() {
    if (this.form.get('searchValue')?.value) {
      this.foundUsers$ = this.usersService.getSearchResults(this.form.get('searchValue')?.value);
    }
  }

  get searchValue() {
    return this.form.get('searchValue')?.value;
  }
}
