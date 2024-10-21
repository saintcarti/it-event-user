import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {

  constructor() {}

  // Función para generar QR
  generarQR() {
    // Aquí va la lógica para generar el QR
    console.log('Generando QR...');
  }

  // Función para escanear QR
  escanearQR() {
    // Aquí va la lógica para escanear el QR
    console.log('Escaneando QR...');
  }
}

