import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth-guard.service';
import { MeetingReductComponent } from './meeting/meeting-reduct/meeting-reduct.component';
import { MeetingInfoComponent } from './meeting/meeting-info/meeting-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MeetingInfoComponent},
  {path: 'admin', component: MeetingReductComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
