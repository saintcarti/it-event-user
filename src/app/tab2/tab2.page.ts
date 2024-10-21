import { Component, OnInit } from '@angular/core';
import { ApiEventosService } from '../services/api-eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  eventos :any[]=[]

  constructor(private apiuser:ApiEventosService,
    private router:Router){}

  ngOnInit(){
    this.Eventos();
  }

  Eventos(){
    this.apiuser.getEvents().subscribe(datos=> 
      this.eventos = datos,
    )
  }

  buscarEvento(Observable:any){
    this.router.navigate(['/detalle'],
      {queryParams:{event:JSON.stringify(Observable)}})
  }

  getImagePath(imagen: string): string {
    return `assets/Imagenes/${imagen}`; // Asumiendo que tus imágenes están en assets/Imagenes/
  }
  

}
