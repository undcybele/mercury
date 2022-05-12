import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({email: null, password: null})
  }

  ngOnInit(): void {
  }

  signIn(email: string, pass: string) {
      this.authService.SignIn(email, pass).then()
  }

  googleAuth() {
    this.authService.GoogleAuth().then()
  }



}
