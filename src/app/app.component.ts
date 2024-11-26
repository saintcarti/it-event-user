import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle';
import { Platform } from '@ionic/angular';
register(); 
interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  menu:Menu[]=[
    {
      icon:'sparkles-outline',
      name: 'Iniciar Sesión',
      redirecTo: '/inicio'
    },
    {
      icon:'flower-outline',
      name: 'Home',
      redirecTo: '/tabs/tab1'
    }, 
    {
      icon:'bug-outline',
      name: 'Eventos',
      redirecTo: '/tabs/tab2'
    },   
    {
      icon:'person-circle-outline',
      name: 'Mi Perfil',
      redirecTo: '/tabs/tab3'
    },
  ]

  constructor(private platForm:Platform) {
    this.initializaApp();
  }

  initializaApp(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark){
      document.body.setAttribute('data-theme','dark');
    }else{
      document.body.setAttribute('data-theme','light');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',(e)=>{
      const colorScheme = e.matches ? 'dark': 'light';
      document.body.setAttribute('data-theme',colorScheme);
    });
  }
}
