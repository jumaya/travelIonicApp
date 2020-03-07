import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ContentChild, ViewChild } from '@angular/core';
import { LoadingController, AlertController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  client: Observable<any>;
  loading: any;
  detailUser: any;
  textSearch = "";
  addClient: Observable<any>;
  @ViewChild(IonInfiniteScroll, {static:false}) infiniteScroll: IonInfiniteScroll;
  data: any[] = Array(20);

  constructor(
    private clientService: ClientService,
    private LoadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
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

  onSearchChange(event) {
    localStorage.removeItem("phone");
    this.textSearch = event.detail.value;
    this.searchbyPhoneNumber(this.textSearch);
    localStorage.setItem('phone', event.detail.value);
  }

  async searchbyPhoneNumber(phone) {
    return this.addClient = this.clientService.findClientByPhone(phone);
  }

  async delete(item) {

    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure that you want to delete this client?. <strong> It´s will be deleted with his personal information.</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {

            var formData = new FormData();
            formData.append('client_id', item.client_id);
            this.clientService.deleteClient(formData).toPromise().then((res) => {
              this.presentAlert();              
            })
              .catch(err => { console.log(err) });
          }
        }
      ]
    });

    await alert.present();

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Info',
      cssClass: 'tertiary',
      message: 'Client was deleted succesfully.!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  loadData(event){    
    setTimeout(() => {          
      if (this.client.subscribe.length == 1000) {
        event.target.disabled = true;
        this.infiniteScroll.disabled = true;     
      }         
    }, 1000);
  }  



}
