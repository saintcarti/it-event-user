import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipaService } from 'src/app/services/participa.service';
@Component({
  selector: 'app-registrados',
  templateUrl: './registrados.page.html',
  styleUrls: ['./registrados.page.scss'],
})
export class RegistradosPage implements OnInit {
  events: any[] = [];

  constructor(private router: Router,
              private apiservice:ParticipaService  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(){
    this.apiservice.getParticipacionByCorreo(localStorage.getItem('email')).subscribe(data => {
      this.events = data;
    })
  }

  goBack() {
    this.router.navigate(['/tabs']); 
  }
}

