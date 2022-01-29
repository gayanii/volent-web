import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistrictList } from 'src/app/core/enums/district.enum';
import { EventDto } from 'src/app/core/models/event-dto';
import { InterestsDto } from 'src/app/core/models/interests-dto';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm!: FormGroup;
  error = false;
  imageSrc!: string;
  interests: InterestsDto[] =[];
  districts:any;
  formattedDate!: Date;

  constructor(private fb: FormBuilder, private eventservice: EventService,
    private router : Router, private datePipe: DatePipe) { 
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getAllInterestsAreas();
    this.districts = DistrictList;
  }

  initializeForm()
  {
    this.createEventForm = this.fb.group({
      'eventName': ['', Validators.required],
      'description': ['', Validators.required],
      'location': ['', Validators.required],
      'banner': ['', Validators.required],
      'district': ['', Validators.required],
      'interests': new FormArray([]),
      'eventStartDate': ['', Validators.required],
      'eventEndDate': ['', Validators.required],
    });
  }

  dateFormat(date:any) {
    this.formattedDate = new Date(date);
    return this.datePipe.transform(this.formattedDate, 'yyyy-MM-dTHH:mm:ss');
  }

  createEvent() {
    if (this.createEventForm.valid) {
      let event:EventDto = this.getFormData();
      this.eventservice.createEvent(event).subscribe(
        data=>{
          this.router.navigate(['dashboard/upcoming']);
        },
        error=>{

        }
      )
      console.log(event);
    }
    console.log(this.dateFormat(this.createEventForm.value.eventStartDate));
    console.log(this.createEventForm.value.district);
    // "this.createEventForm.value.banner" gives the image url as a string
  }

  getFormData():EventDto
  {
    const createEventFormValues = this.createEventForm.value;
    const selectedInterestIds: number[] = createEventFormValues.interests
      .map((checked:any, i:any) => checked ? this.interests[i].interestId : null)
      .filter((v:any) => v !== null);

    return ({
      EventName : createEventFormValues.eventName,
      Description : createEventFormValues.description,
      Location: createEventFormValues.location,
      EventBanner: "image.jpg",
      District: parseInt(createEventFormValues.district.key.toString()),
      EventStartDate: this.dateFormat(createEventFormValues.eventStartDate),
      EventEndDate: this.dateFormat(createEventFormValues.eventEndDate),
      Interests : selectedInterestIds,
      EventStatus: 1
    } as EventDto);
  }

  checkErrors() {
    this.error = true;
  }

  reset() {
    this.error = false;
    this.imageSrc = "";
    this.createEventForm.reset();
  }

  get interestFormArray() {
    return this.createEventForm.controls.interests as FormArray;
  }

  getAllInterestsAreas()
  {
    this.eventservice.getAllInterestAreas().subscribe(
      data=>{
        this.interests = data;
        console.log(this.interests);
        this.addCheckboxesToForm();
      }
    )
  }

  private addCheckboxesToForm() {
    this.interests.forEach(() => this.interestFormArray.push(new FormControl(false)));
  }

  onFileChange(event: any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.createEventForm.patchValue({
          banner: reader.result
        });
      };
    
    }
  }
}
