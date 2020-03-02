import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  components: Observable<Componente[]>;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.components =  this.appService.getMenuOptions();
  }

}
