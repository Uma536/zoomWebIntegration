import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'join-meeting', component: JoinMeetingComponent },
  { path: 'create-meeting', component: CreateMeetingComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
