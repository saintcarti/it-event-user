import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarios: any[] = []; // Renombrado a 'comentarios' para mayor claridad
  errorMessage: string = ''; // Para manejar errores

  constructor(private quejas: QuejasService, private router: Router) {}

  ngOnInit() {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.quejas.getQuejas().subscribe(
      datos => {
        this.comentarios = datos; // Asegúrate de que 'datos' sea un array
      },
      error => {
        this.errorMessage = 'Error al cargar comentarios. Inténtalo de nuevo más tarde.';
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
