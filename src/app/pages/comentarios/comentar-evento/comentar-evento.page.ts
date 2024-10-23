import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipaService } from 'src/app/services/participa.service';
import { ComentarEvento } from 'src/interfaces/comentarios';

@Component({
  selector: 'app-comentar-evento',
  templateUrl: './comentar-evento.page.html',
  styleUrls: ['./comentar-evento.page.scss'],
})
export class ComentarEventoPage implements OnInit {
  eventoId: number;
  comentarios: ComentarEvento[] = [];
  constructor(
    private route: ActivatedRoute,
    private participacionservice: ParticipaService
  ) {
    this.eventoId = Number(this.route.snapshot.paramMap.get('eventoId'));
   }

  ngOnInit() {
    this.loadComentarios();
  }

  loadComentarios() {
    // Aquí deberías tener un método en tu servicio para obtener comentarios
    this.participacionservice.getComentariosByParticipacionId(this.eventoId).subscribe(
      (comentarios) => {
        this.comentarios = comentarios;
      },
      (error) => {
        console.error("Error al cargar los comentarios", error);
      }
    );
  }

}
