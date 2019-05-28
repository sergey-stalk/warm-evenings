import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TelegramAlertService } from './services/telegram-alert.service';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiDataService } from './services/api-data.service';
import { MeetingEditComponent } from './admin/meeting-edit/meeting-edit.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MessageComponent } from './admin/message/message.component';
import { AboutComponent } from './user/about/about.component';
import { EditAutorNameComponent } from './admin/edit-poems/edit-autor-name/edit-autor-name.component';
import { AddNewPoemComponent } from './admin/edit-poems/add-new-poem/add-new-poem.component';
import { EditPoemTextComponent } from './admin/edit-poems/edit-poem-text/edit-poem-text.component';
import { EditPoemNameComponent } from './admin/edit-poems/edit-poem-name/edit-poem-name.component';
import { CatchDataService } from './services/catch-data.service';
import { ShowPoemsComponent } from './user/show-poems/show-poems.component';
import { AuthGuard } from './services/auth-guard.service';
import { CheckAuthService } from './services/check-auth.service';
import { RemovePoemComponent } from './admin/edit-poems/remove-poem/remove-poem.component';
import { SearchAutorService } from './services/search-autor.service';
import { SearchPoemService } from './services/search-poem.service';


@NgModule({
   declarations: [
      AppComponent,
      MeetingInfoComponent,
      MeetingEditComponent,
      NavHeaderComponent,
      AuthComponent,
      SettingsComponent,
      AboutComponent,
      MessageComponent,
      ShowPoemsComponent,
      EditAutorNameComponent,
      EditPoemNameComponent,
      EditPoemTextComponent,
      AddNewPoemComponent,
      RemovePoemComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
   ],
   providers: [
      ApiDataService,
      CheckAuthService,
      AuthGuard,
      TelegramAlertService,
      CatchDataService,
      SearchAutorService,
      SearchPoemService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
