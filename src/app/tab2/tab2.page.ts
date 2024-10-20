import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  fechaSeleccionada: string | null = null;
  mostrarCalendario: boolean = false;

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  abrirCalendario() {
    this.mostrarCalendario = true;
  }

  cerrarCalendario() {
    this.mostrarCalendario = false;
  }

  async agendarEvento() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha agendado el evento con éxito.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
            this.navCtrl.navigateForward('/tabs/tab4');
          }
        }
      ]
    });

    await alert.present();
  }
}
