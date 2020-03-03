import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  client: Observable<any>;
  loading: any;
  detailUser: any;

  constructor(
    private clientService: ClientService,
    private LoadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.presentLoading('Wait..').then(() => {
      this.getClientsList().then(() => {
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

  async getClientsList() {
    return this.client = this.clientService.getClient();
  }

  onClick(user) {      
    localStorage.setItem("userData", JSON.stringify(user));
    return this.router.navigate(['/client-detail']);
    
  }

}
