import { TelegramAlertService } from './services/telegram-alert.service';

import { AuthGuard } from './services/auth-guard.service';
import { CheckAuthService } from './services/check-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiDataService } from './services/api-data.service';
import { FasebookUserComponent } from './user/fasebook-user/fasebook-user.component';
import { MeetingReductComponent } from './admin/meeting-reduct/meeting-reduct.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from './nav-header/nav-header.component';

@NgModule({
   declarations: [
      AppComponent,
      MeetingInfoComponent,
      MeetingReductComponent,
      NavHeaderComponent,
      AuthComponent,
      FasebookUserComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [
      ApiDataService,
      CheckAuthService,
      AuthGuard,
      TelegramAlertService

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
