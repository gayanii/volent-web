import { Component, OnInit } from '@angular/core';
import { EventDto } from 'src/app/core/models/event-dto'; 
import {EventService} from 'src/app/features/event/event.service';
import { EventStatus } from 'src/app/core/enums/event-status.enum';
import {UserDto} from 'src/app/core/models/user-dto.model';
import {StorageService} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  upcomingEvents:any;
  arr: Array<string> = ['./assets/trees.jfif', './assets/Reasons-To-Do-Voluntary-Work.jpg', './assets/img3.jpg','./assets/img4.jpg','./assets/img5.jpg','./assets/img6.jpg','./assets/img10.jpg','./assets/img7.jpg','./assets/img8.jpg','./assets/img9.jpg'];

  constructor(private eventService:EventService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents(){
    let user:UserDto = JSON.parse(this.storageService.get("loggedUser"));
    this.eventService.getEventsByStatus(EventStatus.Draft, user.UserId).subscribe(
      data=>{
        this.upcomingEvents = data;
        for(let i=0; i<this.upcomingEvents.length; i++){
          console.log(this.upcomingEvents.eventBanner); //use i instead of 0
          var item = this.arr[Math.floor(Math.random() * this.arr.length)];
          this.upcomingEvents[i].eventBanner = item;
       }
      }
    )
  }
}
