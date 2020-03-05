import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TravelService } from './../../services/travel.service';

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {

  travel: Observable<any>;
  loading: any;

  constructor(
    private travelService: TravelService,
    private LoadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.presentLoading('Wait..').then(() => {
      this.getTravelsList().then(() => {
        this.loading.dismiss();
      });
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.LoadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  async getTravelsList() {   
    return this.travel = this.travelService.getTravel();
  }

  onClick(data){    
    localStorage.setItem("travelData", JSON.stringify(data));
    return this.router.navigate(['/travel-detail']);
  }
  

}
