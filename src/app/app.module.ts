import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    AppComponent,
    JoinMeetingComponent,
    CreateMeetingComponent,
    DialogboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  ],
  providers: [DialogboxComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogboxComponent
],
})
export class AppModule { }
