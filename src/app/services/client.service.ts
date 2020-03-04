import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  ApiUrl = config.ApiUrl;

  constructor(
    private http: HttpClient) { }

  getClient() {
    return this.http.get(this.ApiUrl + '/getClient');
  }

  getTravelByClientId(client_id) {
    return this.http.get(this.ApiUrl + '/getTravelByClientId', { 'params': { 'data': client_id } });
  }

  findClientByPhone(phone) {
    return this.http.get(this.ApiUrl + '/findClientByPhone', { 'params': { 'data': phone } });
  }

  saveClient(data) {
    
    const headers = {      
      'content-type': 'application/json'
    };

    return this.http.post(this.ApiUrl + '/storeClient', data,
      { headers: headers });
  }
}
