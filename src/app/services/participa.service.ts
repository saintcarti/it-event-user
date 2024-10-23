import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';
import { Participacion,ParticipacionNueva } from 'src/interfaces/participacion';
import { Observable } from 'rxjs';
import { ComentarEvento } from 'src/interfaces/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {

  private url = environment.apiUrl;
  constructor(private http:HttpClient) { }

  GetUserByCorreo(email: any): Observable<Users> {
    return this.http.get<Users>(`${environment.apiUrl}/usuarios/?email=${email}`);
  }

  postParticipacion(nuevaParticipacion:ParticipacionNueva): Observable<ParticipacionNueva>{
    return this.http.post<ParticipacionNueva>(`${environment.apiUrl}/participaciones`,nuevaParticipacion);
  }

  getParticipaciones(): Observable<Participacion[]>{
    return this.http.get<Participacion[]>(`${environment.apiUrl}/Participacion`);
  }

  deleteParticipacion(id:number):Observable<any>{
    return this.http.delete<Participacion>(`${environment.apiUrl}/Participacion/${id}`);
  }

  getParticipacionByCorreo(email: any): Observable<Participacion[]> {
    return this.http.get<Participacion[]>(`${environment.apiUrl}/Participacion/?email=${email}`);
  }

  guardarComentario(comentarioData: ComentarEvento): Observable<ComentarEvento> {
    return this.http.post<ComentarEvento>(`${this.url}/ComentarEvento`, comentarioData);
  }

  getComentariosByParticipacionId(participacionId: number): Observable<ComentarEvento[]> {
    return this.http.get<ComentarEvento[]>(`${this.url}/comentarios/?EventoId=${participacionId}`);
  }

}
