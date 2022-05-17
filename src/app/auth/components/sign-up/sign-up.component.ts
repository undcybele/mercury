import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({email: null, password: null})
  }

  ngOnInit(): void {
  }

  signUp(email: string, pass: string, username: string) {
    this.authService.SignUp(email, pass, username).then()
  }

  googleAuth() {
    this.authService.GoogleAuth().then()
  }
}
