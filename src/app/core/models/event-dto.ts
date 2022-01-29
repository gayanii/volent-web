import {District} from 'src/app/core/enums/district.enum';
import {EventStatus} from 'src/app/core/enums/event-status.enum';

export interface EventDto {
    EventId : string;
    Location : string;
    Description : string;
    EventBanner : string;
    EventName : string;
    EventStartDate : any;
    EventEndDate : any;
    Interests : number[];
    District : District;
    EventStatus : EventStatus;
    UserJoined : boolean;
}
