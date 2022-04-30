import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignInComponent} from './auth/components/sign-in/sign-in.component';
import {SignUpComponent} from './auth/components/sign-up/sign-up.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {firebaseConfig} from "../environments/firebase.config";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
