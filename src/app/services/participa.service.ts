import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from 'src/interfaces/users';
import { Participacion,ParticipacionNueva } from 'src/interfaces/participacion';
import { Observable } from 'rxjs';

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
    return this.http.get<Participacion[]>(`${environment.apiUrl}/participaciones`);
  }

  deleteParticipacion(participacion:any):Observable<Participacion>{
    return this.http.delete<Participacion>(`${environment.apiUrl}/participaciones/${participacion.id}`);
  }
}
