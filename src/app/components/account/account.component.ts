import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {IUser} from "../../models/IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userDetails!: IUser

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userDetails = this.authService.currentUser!
  }

  signOut() {
    this.authService.SignOut().then(() => this.router.navigate(['/auth']))
  }
}
