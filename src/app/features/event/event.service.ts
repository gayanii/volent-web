import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/core/enums/api-endpoints.enum';
import {BaseService} from 'src/app/core/services/base.service';
import {EventDto} from 'src/app/core/models/event-dto';
import { InterestsDto } from 'src/app/core/models/interests-dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(protected _http: HttpClient,
    private baseService : BaseService) { }

    getEventsByStatus(typeId:number) : Observable<EventDto>
    {
      let apiUrl:string = ApiEndpoints.EventByType;
      apiUrl = apiUrl.replace("{typeId}",typeId.toString());
      return this.baseService.findAll(apiUrl);
    }

    createEvent(event:EventDto) {
      return this.baseService.post(event,ApiEndpoints.CreateEvent);
    }

    getAllInterestAreas() : Observable<InterestsDto[]>{
    return this.baseService.findAll(ApiEndpoints.AllInterests);
    }
}
