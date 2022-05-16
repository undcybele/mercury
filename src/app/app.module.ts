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
import {ContactOverviewComponent} from './components/dashboard/chat/contact-overview/contact-overview.component';
import {AccountComponent} from './components/account/account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbActionsModule, NbButtonModule,
  NbCardModule, NbChatModule, NbFormFieldModule, NbIconModule, NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSidebarModule, NbSidebarService, NbTagModule,
  NbThemeModule, NbToastrModule, NbToastrService,
  NbUserModule, NbWindowModule
} from "@nebular/theme";
import {ChatComponent} from './components/dashboard/chat/chat.component';
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  ChatInputFormComponent
} from './components/dashboard/sidebar/utilities-row/chat-input-form/chat-input-form.component';
import {ErrorComponent} from "./components/error/error.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    SidebarComponent,
    ContactListComponent,
    UtilitiesRowComponent,
    ContactOverviewComponent,
    AccountComponent,
    ChatComponent,
    ChatInputFormComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbWindowModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbWindowModule.forRoot(),
    NbListModule,
    NbCardModule,
    NbUserModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSidebarModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbChatModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbTagModule,
    NbToastrModule.forRoot(),
  ],
  providers: [NbSidebarService, NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
