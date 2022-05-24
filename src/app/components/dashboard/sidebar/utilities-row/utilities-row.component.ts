import {Component, OnInit} from '@angular/core';
import {NbWindowService} from "@nebular/theme";
import {ChatInputFormComponent} from "./chat-input-form/chat-input-form.component";
import {SteganoComponent} from "./stegano/stegano.component";

@Component({
  selector: 'app-utilities-row',
  templateUrl: './utilities-row.component.html',
  styleUrls: ['./utilities-row.component.css']
})
export class UtilitiesRowComponent implements OnInit {

  constructor(private windowService: NbWindowService) {
  }

  ngOnInit(): void {
  }

  openWindowChatRoom() {
    const windowRef = this.windowService.open(ChatInputFormComponent, {title: `New Chat`});
    windowRef.onClose.subscribe();
  }

  openWindowStegano() {
    const windowRef = this.windowService.open(SteganoComponent, {title: `Encrypt your message`});
    windowRef.onClose.subscribe();
  }
}
