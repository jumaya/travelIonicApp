import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  ApiUrl = config.ApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTravel() {
    return this.http.get(this.ApiUrl + '/getTravelList');
  }

  getClientByTravelParams(data) {
    return this.http.get(this.ApiUrl + '/getClientByTravelParams',
      {
        'params': {
          'country': data.country,
          'city': data.city,
          'travel_date': data.travel_date
        }
      });
  }

}
