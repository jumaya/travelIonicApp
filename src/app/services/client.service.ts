import { HttpClient, HttpHeaders} from '@angular/common/http';
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
}
