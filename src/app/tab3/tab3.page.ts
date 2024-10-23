import { Component, OnInit } from '@angular/core';
import { ParticipaService } from '../services/participa.service';
import { Router } from '@angular/router';
import { Participacion } from 'src/interfaces/participacion';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  participacion: any[] = [];
  email: string | null = sessionStorage.getItem('email');

  constructor(private participacionservice: ParticipaService, private router: Router) {}

  ngOnInit() {
    if (this.email) {
      this.loadEvents(this.email);
    } else {
      console.error('No se encontró el correo electrónico en sessionStorage');
    }
  }

  loadEvents(email: string) {
    this.participacionservice.getParticipacionByCorreo(email).subscribe(
      (participa) => {
        this.participacion = participa;
      },
      (error) => {
        console.error("Error al cargar las participaciones ", error);
      }
    );
  }

  borrarEvento(id: number) {
    // Lógica para borrar la participación usando el servicio
    this.participacionservice.deleteParticipacion(id).subscribe(() => {
      // Filtra la lista de participaciones para eliminar la que fue borrada
      this.participacion = this.participacion.filter(evento => evento.id !== id);
    }, (error) => {
      console.error("Error al borrar la participación", error);
    });
  }
  

  dejarOpinion(id: number) {
    this.router.navigate(['/dejar-opinion', { eventoId: id }]);
  }
}
