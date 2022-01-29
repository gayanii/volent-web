import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NewEventsComponent } from './new-events/new-events.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UpcomingEventsComponent,
    NewEventsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
