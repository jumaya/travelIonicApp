import { Router } from '@angular/router';
import { ClientService } from './../../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {

  get first_name() {
    return this.loginForm.get("first_name");
  }
  get last_name() {
    return this.loginForm.get("last_name");
  }
  get phone() {
    return this.loginForm.get("phone");
  }
  get email() {
    return this.loginForm.get("email");
  }
  get address() {
    return this.loginForm.get("address");
  }

  image: string;
  base64Image = '';

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    first_name: [
      { type: 'required', message: 'First Name is required' },
      {
        type: 'maxlength',
        message: 'First name cant be longer than 128 characters'
      }
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required' },
      {
        type: 'maxlength',
        message: 'Last name cant be longer than 128 characters'
      }
    ],
    address: [
      { type: 'required', message: 'Address is required' }
    ],
  };

  private loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera,
    private webView: WebView,
    private clientService: ClientService,
    public alertController: AlertController,
    private router: Router,
  ) {

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
        ]
      ],
      phone:
        [localStorage.getItem('phone'),
        [
          Validators.required,
          Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
        ]
        ],
      first_name: ['', [Validators.required, Validators.maxLength(128)]],
      last_name: ['', [Validators.required, Validators.maxLength(128)]],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    var formData = new FormData();
    formData.append('first_name', this.loginForm.value.first_name);
    formData.append('last_name', this.loginForm.value.last_name);
    formData.append('email', this.loginForm.value.email);
    formData.append('phone', this.loginForm.value.phone);
    formData.append('address', this.loginForm.value.address);
    formData.append('photo', this.base64Image);

    this.clientService.saveClient(formData).toPromise().then((res) => {
      this.presentAlert();
      return this.router.navigate(['/client']);
    })
      .catch(err => { console.log(err) });
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


  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      correctOrientation: true
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
        this.base64Image = imageData;      
      }, (err) => {
        console.log(err);
      });
  }

}
