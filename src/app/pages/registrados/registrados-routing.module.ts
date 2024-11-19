import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistradosPage } from './registrados.page';

const routes: Routes = [
  {
    path: '',
    component: RegistradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistradosPageRoutingModule {}
