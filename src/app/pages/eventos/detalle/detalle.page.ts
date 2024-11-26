import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveQrDataService } from 'src/app/services/save-qr-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  // Declarar
  evento: any;
  qrdata: string = '';
  nombre: string | null;
  rut: string | null;

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private saveQrDataService: SaveQrDataService,
    private al: AlertController
  ) {
    // Inicializar
    this.activated.queryParams.subscribe(params => {
      this.evento = JSON.parse(params['event']);
    });

    this.nombre = sessionStorage.getItem('nombre');
    this.rut = sessionStorage.getItem('rut');
  }

  ngOnInit() {}

  regresar() {
    this.router.navigate(['/tabs/tab2']);
    this.qrdata = '';
  }

  async validarQr() {
    if (this.qrdata.length > 0) {
      // Comprobar si el QR ya ha sido guardado en el servidor
      const qrExiste = await this.comprobarSiQrExiste();

      if (qrExiste) {
        // Si el QR ya existe, mostrar alerta
        const alert = await this.al.create({
          header: 'Ya se generó un QR',
          message: 'Ya se generó un QR para este evento',
          buttons: [{ text: 'Aceptar' }],
        });
        await alert.present();
      } else {
        // Si no existe, generar el QR y guardarlo
        const alert = await this.al.create({
          header: 'QR generado',
          message: 'QR generado correctamente',
          buttons: [
            {
              text: 'Guardar',
              handler: () => {
                this.generarQr();
              },
            },
          ],
        });
        await alert.present();
      }
    }
  }

  // Función para generar el QR
  generarQr() {
    this.qrdata = `${this.evento.nombre}  - ${this.evento.fecha} - ${this.evento.lugar} - ${this.nombre} - ${this.rut}`;
    console.log(this.qrdata);
    this.saveData();
  }

  // Función para comprobar si el QR ya existe en el servidor
  async comprobarSiQrExiste() {
    return new Promise<boolean>((resolve, reject) => {
      this.saveQrDataService.getQrData().subscribe((data: any[]) => {
        // Verificar si ya existe un QR para este evento y usuario
        const qrExistente = data.find(qr =>
          qr.usuarioRut === this.rut && qr.nombre === this.evento.nombre && qr.fecha === this.evento.fecha
        );
        resolve(qrExistente != null); // Devuelve true si el QR ya existe
      }, error => {
        console.error('Error al verificar si el QR existe:', error);
        reject(false); // En caso de error, consideramos que no existe el QR
      });
    });
  }

  // Función para guardar el QR en el servidor
  saveData() {
    const qrInfo = {
      nombre: this.evento.nombre,
      fecha: this.evento.fecha,
      lugar: this.evento.lugar,
      usuarioNombre: this.nombre,
      usuarioRut: this.rut
    };

    this.saveQrDataService.saveQrData(qrInfo).subscribe(
      response => {
        console.log('Datos del QR guardados correctamente', response);
      },
      error => {
        console.log('Error al guardar los datos del QR', error);
      }
    );
  }
}
