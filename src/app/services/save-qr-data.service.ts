import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaveQrDataService {

  constructor(private http:HttpClient) { }

  saveQrData(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/Participacion`,data);
  }
}
