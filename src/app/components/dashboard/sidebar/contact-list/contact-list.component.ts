import {Component, OnInit} from '@angular/core';
import {IChatRoom} from "../../../../models/IChatRoom";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Array<{ name: string }> = [{name: "Nicoleta"}, {name: "Larisa"}, {name: "Ana"}]
  constructor() {
  }

  ngOnInit(): void {
  }

}
