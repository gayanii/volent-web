import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistrictList } from 'src/app/core/enums/district.enum';
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

  constructor(private fb: FormBuilder, private eventservice: EventService,private router : Router) { 
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
      'EventStartDate': ['', Validators.required],
      'EventEndDate': ['', Validators.required],
    });
  }

  createEvent() {
    if (this.createEventForm.valid) {
    }
    // "this.createEventForm.value.banner" gives the image url as a string
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
