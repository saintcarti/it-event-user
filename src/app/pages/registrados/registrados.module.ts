import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistradosPageRoutingModule } from './registrados-routing.module';

import { RegistradosPage } from './registrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistradosPageRoutingModule
  ],
  declarations: [RegistradosPage]
})
export class RegistradosPageModule {}
