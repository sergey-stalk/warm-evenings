import { AuthGuard } from './auth-guard.service';
import { CheckAuthService } from './check-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiDataService } from './meeting/api-data.service';
import { MeetingInfoComponent } from './meeting/meeting-info/meeting-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MeetingReductComponent } from './meeting/meeting-reduct/meeting-reduct.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
   declarations: [
      AppComponent,
      MeetingInfoComponent,
      MeetingReductComponent,
      NavHeaderComponent,
      AuthComponent
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
      AuthGuard

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
