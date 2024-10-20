import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  email: string = ''; 

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  
  async recuperar() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperación de contraseña',
      message: `Se ha enviado un correo de recuperación a: ${this.email}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  
  goToInicio() {
    this.navCtrl.navigateBack('/inicio'); 
  }
}
