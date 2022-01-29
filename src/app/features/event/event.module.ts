import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { AttendedEventsComponent } from './attended-events/attended-events.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { CreateEventComponent } from './create-event/create-event.component';


@NgModule({
  declarations: [
    UpcomingEventsComponent,
    AttendedEventsComponent,
    MyEventsComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModule { }
