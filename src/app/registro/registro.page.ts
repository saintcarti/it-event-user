import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  async registrar() {
    const alert = await this.alertCtrl.create({
      header: 'Registro Exitoso',
      message: 'Te has registrado de forma exitosa.',
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();

    this.navCtrl.navigateRoot('/inicio');
  }
}
