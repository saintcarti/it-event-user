import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) { }

  ingresar() {
  
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  goToRecuperar() {
    this.navCtrl.navigateForward('/recuperar');
  }
}
