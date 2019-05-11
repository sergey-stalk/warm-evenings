import { FasebookUserComponent } from './user/fasebook-user/fasebook-user.component';
import { MeetingReductComponent } from './admin/meeting-reduct/meeting-reduct.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MeetingInfoComponent},
  {path: 'admin', component: MeetingReductComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'fasebook-user', component: FasebookUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
