import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {DashboardGuard} from "./auth/guards/dashboard.guard";
import {AccountComponent} from "./components/account/account.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/auth'},
  {
    path: 'auth',
    canActivate: [DashboardGuard],
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:chatRoomId', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
