import { Component, OnInit } from '@angular/core';
import { ApiEventosService } from '../services/api-eventos.service';

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
  eventos :any[]=[]
  
  constructor(private apiuser:ApiEventosService) {}

  ngOnInit() {
    this.Eventos()
  }

  swiperSlideChanged(e:any){
    console.log('Cambio de slide', e);
  }
  
  Eventos(){
    this.apiuser.getEvents().subscribe(datos=> 
      this.eventos = datos,
    )
  }
  getImagePath(imagen: string): string {
    return `assets/Imagenes/${imagen}`; // Asumiendo que tus imágenes están en assets/Imagenes/
  }

  contactar(){
    
  }
}
