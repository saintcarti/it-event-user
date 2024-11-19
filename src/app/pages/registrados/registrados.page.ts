import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrados',
  templateUrl: './registrados.page.html',
  styleUrls: ['./registrados.page.scss'],
})
export class RegistradosPage implements OnInit {
  events: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get('assets/json/almacen.json').subscribe(
      (data: any) => {
        this.events = data.events; 
      },
      (error) => {
        console.error('Error al cargar el JSON:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/perfil']); 
  }
}

