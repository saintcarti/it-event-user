import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss']
})
export class EditarPage {
  constructor(private navCtrl: NavController, private alertController: AlertController, private router: Router) {}

  goBack() {
    this.navCtrl.back();
  }
  async guardarCambios() {
    
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Los cambios se han guardado con éxito.',
      buttons: ['OK']
    });

    await alert.present();

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 1000);
  }
}



