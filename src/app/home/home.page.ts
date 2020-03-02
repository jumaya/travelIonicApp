import { Observable } from 'rxjs';
import { AppService } from './../services/app.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Componente } from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  components: Observable<Componente[]>;

  constructor(
    private menuCtrl: MenuController,
    private appService: AppService

  ) {}

  ngOnInit() {
    this.components = this.appService.getMenuOptions();
  }

  toggleMenu(){
    this.menuCtrl.toggle();     
  }

}
