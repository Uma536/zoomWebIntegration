import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';


const routes: Routes = [
  { path: 'join-meeting', component: JoinMeetingComponent },
  { path: 'create-meeting', component: CreateMeetingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
