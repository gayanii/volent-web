import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AttendedEventsComponent } from 'src/app/features/event/attended-events/attended-events.component';
import { MyEventsComponent } from 'src/app/features/event/my-events/my-events.component';
import { UpcomingEventsComponent } from 'src/app/features/dashboard/upcoming-events/upcoming-events.component';
const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  // {
  //   path: 'upcoming', 
  //   component: UpcomingEventsComponent
  // },
  // {
  //   path: 'attended', 
  //   component: AttendedEventsComponent
  // },
  // {
  //   path: 'my', 
  //   component: MyEventsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
