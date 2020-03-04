import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

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
  get adress() {
    return this.loginForm.get("adress");
  }

  image: string;


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
    adress: [
      { type: 'required', message: 'Adress is required' }
    ],
  };

  private loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera,
    private webView: WebView
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
      adress: ['', Validators.required],
    });
  }


  ngOnInit() {

  }

  onSubmit() {
    console.log(this.loginForm.value)
  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = this.webView.convertFileSrc(imageData);
      }, (err) => {
        console.log(err);
      });
  }

}
