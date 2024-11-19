import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Users | null = null; 

  constructor(private navCtrl: NavController, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al iniciar
  }

  loadUserData() {
    const email = sessionStorage.getItem('email');

    if (email) {
      this.auth.GetUserByCorreo(email).subscribe(
        (usuarios: Users[]) => {
          if (usuarios.length > 0) {
            this.usuario = usuarios[0]; // Asigna el usuario encontrado
            // Cargar la imagen desde sessionStorage
            this.usuario.fotoPerfil = sessionStorage.getItem('fotoPerfil') || this.usuario.fotoPerfil;
          } else {
            console.error('Usuario no encontrado');
            this.router.navigate(['/inicio']); 
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.router.navigate(['/inicio']); 
        }
      );
    } else {
      console.error('Correo no encontrado en sessionStorage');
      this.router.navigate(['/inicio']); 
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']); 
  }

  editarPerfil() {
    this.router.navigateByUrl('/editar').then(() => {
      this.router.navigateByUrl('/perfil');
      window.location.reload(); 
    });
  }

  verEventoRegistrado() {
    this.router.navigate(['/registrados']); 
  }
}
