import { Observable } from 'rxjs';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {

  clientDetail: any;
  travel: Observable<any>;
  constructor(
    private clientService: ClientService 

  ) { }

  ngOnInit() {           
     this.clientDetail = JSON.parse(localStorage.getItem("userData"));     
     this.getTravelById(this.clientDetail.client_id);     
  }

  async getTravelById(id){        
    return this.travel = this.clientService.getTravelByClientId(id);          
  }

}
