import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NbTagComponent, NbTagInputAddEvent} from "@nebular/theme";

@Component({
  selector: 'app-chat-input-form',
  templateUrl: './chat-input-form.component.html',
  styleUrls: ['./chat-input-form.component.css']
})
export class ChatInputFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
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
}
