import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AuthRoutingModule
  ]
})
export class AuthModule {
}
