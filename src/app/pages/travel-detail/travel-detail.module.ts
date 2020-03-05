import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDetailPageRoutingModule } from './travel-detail-routing.module';

import { TravelDetailPage } from './travel-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TravelDetailPage]
})
export class TravelDetailPageModule {}
