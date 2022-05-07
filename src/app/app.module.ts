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
import {SidebarComponent} from './components/dashboard/sidebar/sidebar.component';
import {ContactListComponent} from './components/dashboard/sidebar/contact-list/contact-list.component';
import {UtilitiesRowComponent} from './components/dashboard/sidebar/utilities-row/utilities-row.component';
import {SearchRowComponent} from './components/dashboard/sidebar/search-row/search-row.component';
import {ChatViewComponent} from './components/dashboard/chat-view/chat-view.component';
import {ContactOverviewComponent} from './components/dashboard/contact-overview/contact-overview.component';
import {MessageInputRowComponent} from './components/dashboard/message-input-row/message-input-row.component';
import {AccountComponent} from './components/account/account.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    SidebarComponent,
    ContactListComponent,
    UtilitiesRowComponent,
    SearchRowComponent,
    ChatViewComponent,
    ContactOverviewComponent,
    MessageInputRowComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
