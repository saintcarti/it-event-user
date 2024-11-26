import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipaService } from 'src/app/services/participa.service';
import { ComentarEvento } from 'src/interfaces/comentarios';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-dejar-opinion',
  templateUrl: './dejar-opinion.page.html',
  styleUrls: ['./dejar-opinion.page.scss'],
})
export class DejarOpinionPage {
  eventoId: number;
  comentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participacionservice: ParticipaService,
    private alertController: AlertController // Inyecta AlertController
  ) {
    this.eventoId = Number(this.route.snapshot.paramMap.get('eventoId'));
  }

  // Método para mostrar la alerta
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para enviar el comentario
  enviarComentario() {
    if (!this.comentario.trim()) { // Validamos si el comentario está vacío
      this.mostrarAlerta('Debes rellenar el comentario antes de enviarlo.'); // Mostrar alerta si está vacío
      return; // Detener la ejecución si el campo está vacío
    }

    const comentarioData: ComentarEvento = {
      eventoId: this.eventoId,
      texto: this.comentario, // Usamos 'texto' en lugar de 'comentario'
      email: sessionStorage.getItem('email') || ''
    };

    this.participacionservice.guardarComentario(comentarioData).subscribe(
      () => {
        this.router.navigate(['/comentar-evento', { eventoId: this.eventoId }]);
      },
      (error) => {
        console.error("Error al guardar el comentario", error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/tabs/tab3']);
  }
}
