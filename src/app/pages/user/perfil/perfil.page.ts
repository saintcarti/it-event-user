import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Users | null = null; // Inicializa como null

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
          } else {
            console.error('Usuario no encontrado');
            this.router.navigate(['/inicio']); // Redirige si no se encuentra el usuario
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.router.navigate(['/inicio']); // Redirige en caso de error
        }
      );
    } else {
      console.error('Correo no encontrado en sessionStorage');
      this.router.navigate(['/inicio']); // Redirige si falta el correo
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']); // Regresar a la página anterior
  }

  editarPerfil() {
    this.router.navigateByUrl('/editar').then(() => {
      this.router.navigateByUrl('/perfil');
      window.location.reload(); // Regresar a perfil, esto recargará los datos
    });
  }
  
}
