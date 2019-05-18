import { ShowPoemsComponent } from './user/show-poems/show-poems.component';
import { AuthGuard } from './services/auth-guard.service';
import { CheckAuthService } from './services/check-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TelegramAlertService } from './services/telegram-alert.service';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiDataService } from './services/api-data.service';
import { MeetingReductComponent } from './admin/meeting-reduct/meeting-reduct.component';
import { MeetingInfoComponent } from './user/meeting-info/meeting-info.component';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MessageComponent } from './admin/message/message.component';
import { AboutComponent } from './user/about/about.component';


@NgModule({
   declarations: [
      AppComponent,
      MeetingInfoComponent,
      MeetingReductComponent,
      NavHeaderComponent,
      AuthComponent,
      SettingsComponent,
      AboutComponent,
      MessageComponent,
      ShowPoemsComponent,
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
      TelegramAlertService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
