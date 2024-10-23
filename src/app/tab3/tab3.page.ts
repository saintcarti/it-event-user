import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParticipaService } from '../services/participa.service';
import { Router } from '@angular/router';
import { Participacion } from 'src/interfaces/participacion';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  participacion: any[] = [];
  email: string | null = sessionStorage.getItem('email');
  intervalId: any; // Variable para almacenar el ID del intervalo

  constructor(private participacionservice: ParticipaService, private router: Router) {}

  ngOnInit() {
    if (this.email) {
      this.loadEvents(this.email);
      this.startAutoRefresh(); // Iniciar la actualización automática
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

  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      this.loadEvents(this.email!); // Recarga los eventos
    }, 5000); // Cada 5 segundos
  }

  borrarEvento(id: number) {
    this.participacionservice.deleteParticipacion(id).subscribe(() => {
      this.participacion = this.participacion.filter(evento => evento.id !== id);
    }, (error) => {
      console.error("Error al borrar la participación", error);
    });
  }
  
  dejarOpinion(id: number) {
    this.router.navigate(['/dejar-opinion', { eventoId: id }]);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpiar el intervalo al destruir el componente
  }
}
