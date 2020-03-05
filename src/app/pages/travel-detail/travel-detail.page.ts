import { Observable } from 'rxjs';
import { TravelService } from './../../services/travel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.page.html',
  styleUrls: ['./travel-detail.page.scss'],
})
export class TravelDetailPage implements OnInit {
  travel_list: Observable<any>;

  constructor(
    private travelService: TravelService
  ) { }

  ngOnInit() {
    this.getClientList();
  }

  async getClientList() {
    this.travel_list = this.travelService.
      getClientByTravelParams(JSON.parse(localStorage.getItem('travelData')));
  }

}
