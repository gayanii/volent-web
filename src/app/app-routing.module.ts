import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AttendedEventsComponent } from './features/event/attended-events/attended-events.component';
import { MyEventsComponent } from './features/event/my-events/my-events.component';
import { UpcomingEventsComponent } from './features/event/upcoming-events/upcoming-events.component';
import { RegistrationComponent } from './features/registration/registration.component';

const routes: Routes = [
  {
    path:'', 
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'dashboard', 
    redirectTo:'/dashboard/upcoming',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren: () => import('src/app/features/home/home-routing.module').then(m=>m.HomeRoutingModule)
  },
  {
    path:'login',
    loadChildren: () => import('src/app/features/auth/auth-routing.module').then(m=>m.AuthRoutingModule)
  },
  {
    path:'',
    loadChildren: () => import('src/app/layout/layout-routing.module').then(m=>m.LayoutRoutingModule)
  },
  {
    path:'register',
    loadChildren: () => import('src/app/features/registration/registration-routing.module').then(m=>m.RegistrationRoutingModule)
  },
  // {path: 'dashboard', component: DashboardComponent,
  //   children: [
  //     {path: 'upcoming', component: UpcomingEventsComponent},
  //     {path: 'attended', component: AttendedEventsComponent},
  //     {path: 'my', component: MyEventsComponent}
  //   ]
  // },
  {
    path:'create-event',
    loadChildren: () => import('src/app/features/event/event-routing.module').then(m=>m.EventRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
