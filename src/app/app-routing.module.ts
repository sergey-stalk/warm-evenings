import { ShowPoemsComponent } from './user/show-poems/show-poems.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MeetingReductComponent } from './admin/meeting-reduct/meeting-reduct.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { MessageComponent } from './admin/message/message.component';
import { AboutComponent } from './user/about/about.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'schedule', component: MeetingInfoComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'show_poems', component: ShowPoemsComponent},
  {path: 'admin', component: MeetingReductComponent, canActivate: [AuthGuard]},
  {path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'admin/message', component: MessageComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
