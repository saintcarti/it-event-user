import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

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

