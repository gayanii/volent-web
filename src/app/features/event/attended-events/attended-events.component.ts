import { Component, OnInit } from '@angular/core';
import {EventService} from 'src/app/features/event/event.service';
import { EventStatus } from 'src/app/core/enums/event-status.enum';
import {UserDto} from 'src/app/core/models/user-dto.model';
import {StorageService} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-attended-events',
  templateUrl: './attended-events.component.html',
  styleUrls: ['./attended-events.component.scss']
})
export class AttendedEventsComponent implements OnInit {

  attentedEvents:any;
  arr: Array<string> = ['./assets/Reasons-To-Do-Voluntary-Work.jpg', './assets/img1.jpg','./assets/img2.jpg','./assets/img3.jpg','./assets/img4.jpg','./assets/img5.jpg','./assets/img6.jpg','./assets/img10.jpg','./assets/img7.jpg','./assets/img8.jpg','./assets/img9.jpg'];
  arrStar: Array<string> = ['./assets/1rating.png', './assets/2rating.png', './assets/3rating.png','./assets/4rating.png','./assets/5rating.png'];

  constructor(private eventService:EventService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.getAttentedEvents();
  }

  getAttentedEvents(){
    let user:UserDto = JSON.parse(this.storageService.get("loggedUser"));
    this.eventService.getEventsByStatus(EventStatus.All, user.UserId).subscribe(
      data=>{
        this.attentedEvents = data;
        for(let i=0; i<this.attentedEvents.length; i++){
          console.log(this.attentedEvents.eventBanner); //use i instead of 0
          var item = this.arr[Math.floor(Math.random() * this.arr.length)];
          var star = this.arrStar[Math.floor(Math.random() * this.arrStar.length)];
          this.attentedEvents[i].eventBanner = item;
          this.attentedEvents[i].star = star;
       }
      }
    )
  }
}
