import { EditVideoComponent } from './admin/edit-video/edit-video.component';
import { ShowPhotoComponent } from './user/show-photo/show-photo.component';
import { RemovePoemComponent } from './admin/edit-poems/remove-poem/remove-poem.component';
import { ShowPoemsComponent } from './user/show-poems/show-poems.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MeetingEditComponent } from './admin/meeting-edit/meeting-edit.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { MessageComponent } from './admin/message/message.component';
import { AboutComponent } from './user/about/about.component';
import { EditAutorNameComponent } from './admin/edit-poems/edit-autor-name/edit-autor-name.component';
import { EditPoemNameComponent } from './admin/edit-poems/edit-poem-name/edit-poem-name.component';
import { EditPoemTextComponent } from './admin/edit-poems/edit-poem-text/edit-poem-text.component';
import { AddNewPoemComponent } from './admin/edit-poems/add-new-poem/add-new-poem.component';
import { EditPhotoComponent } from './admin/edit-photo/edit-photo.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowVideoComponent } from './user/show-video/show-video.component';



const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'schedule', component: MeetingInfoComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'show_poems', component: ShowPoemsComponent},
  {path: 'show_photo', component: ShowPhotoComponent},
  {path: 'show_video', component: ShowVideoComponent},
  {path: 'admin', component: MeetingEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'admin/message', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_poems/edit_autor_name', component: EditAutorNameComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_poems/edit_poem_name', component: EditPoemNameComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_poems/edit_poem_text', component: EditPoemTextComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_poems/add_new_poem', component: AddNewPoemComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_poems/remove_poem', component: RemovePoemComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_photo', component: EditPhotoComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit_video', component: EditVideoComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
