import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule,
  NbToastrModule, NbWindowModule, NbWindowService
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AuthRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbInputModule,
    NbWindowModule,
  ],
  providers: [NbWindowService]
})
export class AuthModule {
}
