import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Actividad {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  actividades: Actividad[] = [
    {
      titulo: 'Seminario de Redes',
      descripcion: 'Aprende sobre las últimas tecnologías en redes.',
      imagen: 'assets/Imagenes/Taller3.png', 
    },
    {
      titulo: 'Taller de Programación',
      descripcion: 'Un taller práctico sobre lenguajes de programación modernos.',
      imagen: 'assets/Imagenes/Taller1.png', 
    },
    {
      titulo: 'Actividad de Ciberseguridad',
      descripcion: 'Mejora tus habilidades en ciberseguridad.',
      imagen: 'assets/Imagenes/Taller2.png', 
    },
    {
      titulo: 'Conferencia de Inteligencia Artificial',
      descripcion: 'Explora el futuro de la IA en la industria.',
      imagen: 'assets/Imagenes/taller4.webp',
    },
    {
      titulo: 'Workshop de Machine Learning',
      descripcion: 'Aplicaciones prácticas de Machine Learning en diferentes campos.',
      imagen: 'assets/Imagenes/taller5.jpg',
    },
    {
      titulo: 'Taller de Diseño UX/UI',
      descripcion: 'Aprende a diseñar interfaces de usuario atractivas.',
      imagen: 'assets/Imagenes/taller6.jpg',
    },
    {
      titulo: 'Curso de Desarrollo Móvil',
      descripcion: 'Crea aplicaciones móviles con las últimas tecnologías.',
      imagen: 'assets/Imagenes/taller7.jpg',
    },
    {
      titulo: 'Hackathon de Innovación',
      descripcion: 'Un desafío intensivo para crear soluciones innovadoras.',
      imagen: 'assets/Imagenes/taller8.webp',
    },
    {
      titulo: 'Seminario sobre Cloud Computing',
      descripcion: 'Descubre cómo aprovechar las plataformas de computación en la nube.',
      imagen: 'assets/Imagenes/taller9.jpg',
    },
    {
      titulo: 'Taller de Realidad Aumentada',
      descripcion: 'Explora el uso de la realidad aumentada en aplicaciones.',
      imagen: 'assets/Imagenes/taller10.png',
    },
    
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  verDetalles(item: Actividad) {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
