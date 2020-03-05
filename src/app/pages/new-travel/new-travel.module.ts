import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTravelPageRoutingModule } from './new-travel-routing.module';

import { NewTravelPage } from './new-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTravelPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NewTravelPage]
})
export class NewTravelPageModule {}
