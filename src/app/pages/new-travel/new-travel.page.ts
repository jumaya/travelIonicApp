import { TravelService } from './../../services/travel.service';
import { Router } from '@angular/router';
import { AlertController, IonButton } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ClientService } from './../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

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

  get email() {
    return this.travelForm.get("email");
  }

  users: Observable<any> = this.clientService.getClient();
  private travelForm: FormGroup;
  emailSelected = "";
  @ViewChild('btnTravel', {static:false}) btnTravel: IonButton;
    

  public errorMessages = {
    trave_date: [
      { type: 'required', message: 'Travel date is required' },
      { type: 'pattern', message: 'Please enter a valid date' }
    ],
    country: [
      { type: 'required', message: 'Country is required' }
    ],
    city: [
      { type: 'required', message: 'City is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private travelService: TravelService,
    private alertController: AlertController,
    private router: Router
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
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    let date = new Date(this.travelForm.value.travel_date);        
    
    this.btnTravel.disabled = true;
    var formData = new FormData();
    formData.append('travel_date', date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    formData.append('country', this.travelForm.value.country);
    formData.append('city', this.travelForm.value.city);
    formData.append('email', this.travelForm.value.email);      
    
    this.travelService.saveTravel(formData).toPromise().then((res) => {
      this.presentAlert();
      this.btnTravel.disabled = false;           
    })
      .catch(err => { 
        console.log(err) 
        this.btnTravel.disabled = false;      
      });      
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      cssClass: 'tertiary',
      message: 'Registration Was Succesful.!',
      buttons: ['OK']
    });

    await alert.present();
  }

  cambioUser() {
    this.emailSelected = this.travelForm.get("email").value;
  }

}
