import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = fb.group({email: null})
  }

  ngOnInit(): void {
  }

  reset(email: string) {
    this.authService.ForgotPassword(email).then()
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['dashboard']));
  }
}
