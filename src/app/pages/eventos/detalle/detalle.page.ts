import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveQrDataService } from 'src/app/services/save-qr-data.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  //declarar
  evento: any;
  qrdata: string = '';
  nombre: string | null;
  rut: string | null;

  constructor(
    private activated: ActivatedRoute, 
    private router: Router,
    private saveQrDataService: SaveQrDataService) {
    //inicializar
    
    this.activated.queryParams.subscribe(params => {
      this.evento = JSON.parse(params['event']);
    });

    this.nombre = sessionStorage.getItem('nombre');
    this.rut = sessionStorage.getItem('rut');
  }

  ngOnInit() {
    
  }
  

  regresar() {
    this.router.navigate(['/tabs/tab2']);
    this.qrdata = '';
  }

  getImagePath(imagen: string): string {
    return `assets/Imagenes/${imagen}`;
  }

  generarQr() {
    this.qrdata = `${this.evento.nombre} - ${this.evento.fecha} - ${this.evento.lugar} - ${this.nombre} - ${this.rut}`;
    console.log(this.qrdata);
    this.saveData();
  }


  saveData(){
    const qrInfo={
      nombre: this.evento.nombre,
      fecha: this.evento.fecha,
      lugar: this.evento.lugar,
      usuarioNombre: this.nombre,
      usuarioRut: this.rut
    };

    this.saveQrDataService.saveQrData(qrInfo).subscribe(response=>{
      console.log("Datos del qr guardados correctamente",response);
    },error=>{
      console.log("Error al guardar los datos del qr",error);
    })
  }
}
