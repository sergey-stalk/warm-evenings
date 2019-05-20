import { ShowPoemsComponent } from './user/show-poems/show-poems.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MeetingEditComponent } from './admin/meeting-edit/meeting-edit.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { MessageComponent } from './admin/message/message.component';
import { AboutComponent } from './user/about/about.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoemsEditComponent } from './admin/poems-edit/poems-edit.component';


const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'schedule', component: MeetingInfoComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'show_poems', component: ShowPoemsComponent},
  {path: 'admin', component: MeetingEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'admin/message', component: MessageComponent, canActivate: [AuthGuard]},
  {path:  'admin/poems_edit', component: PoemsEditComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
