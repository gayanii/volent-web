import { Component, OnInit } from '@angular/core';
import { EventDto } from 'src/app/core/models/event-dto'; 
import {EventService} from 'src/app/features/event/event.service';
import { EventStatus } from 'src/app/core/enums/event-status.enum';
import {UserDto} from 'src/app/core/models/user-dto.model';
import {StorageService} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-db-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  upcomingEvents:any;
  constructor(private eventService:EventService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents(){
    let user:UserDto = JSON.parse(this.storageService.get("loggedUser"));
    this.eventService.getEventsByStatus(EventStatus.Draft, user.UserId).subscribe(
      data=>{
        this.upcomingEvents = data;
      }
    )
  }
}
