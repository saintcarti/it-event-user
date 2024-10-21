import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  evento :any;
  constructor(private activated:ActivatedRoute,
    private router:Router) {
      this.activated.queryParams.subscribe(params=>{
        this.evento = JSON.parse(params['event'])
      })
     }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['/tabs/tab2']);
  }

  getImagePath(imagen: string): string {
    return `assets/Imagenes/${imagen}`; // Asumiendo que tus imágenes están en assets/Imagenes/
  }
}
