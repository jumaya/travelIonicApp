import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.page.html',
  styleUrls: ['./new-travel.page.scss'],
})
export class NewTravelPage implements OnInit {

  get trave_date() {
    return this.travelForm.get("trave_date");
  }
  get country() {
    return this.travelForm.get("country");
  }
  get city() {
    return this.travelForm.get("city");
  } 

  public errorMessages = {
    trave_date: [
      { type: 'required', message: 'Travel date is required' }
    ],
    country: [
      { type: 'required', message: 'Country is required' }
    ],
    city: [
      { type: 'required', message: 'City is required' }     
    ]   
  };

  private travelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.travelForm = this.formBuilder.group({
      travel_date: [
        '',
        [
          Validators.required
        ]
      ],
      country:
        ['',
        [
          Validators.required
        ]
        ],
      city: ['', [Validators.required, Validators.maxLength(128)]],
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    
  }

}
