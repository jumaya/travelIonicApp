import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit {

  clientDetail: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {           
     this.clientDetail = JSON.parse(localStorage.getItem("userData"));    
     console.log(this.clientDetail);
  }

}
