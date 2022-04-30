import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {CommonModule} from "@angular/common";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";

const routes: Routes = [
  {
    path: '', component: SignInComponent, pathMatch: 'full',
    children: [{path: 'sign-up', component: SignUpComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'verify-email', component: VerifyEmailComponent}],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
