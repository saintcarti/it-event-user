import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss']
})
export class EditarPage implements OnInit {
  usuario: Users | null = null; 
  user: Users = {
    id: 0,
    nombre: "",
    email: "",
    password: "",
    rut: "",
    imagen: "",
    isActive: true
  };

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private auth: AuthService
  ) {
    const email = sessionStorage.getItem('email');

    if (!email) {
      console.error('Correo no encontrado en sessionStorage');
      this.router.navigate(['/perfil']);
      return;
    }

    this.auth.GetUserByCorreo(email).subscribe(
      (usuarios: Users[]) => {
        if (usuarios.length > 0) {
          this.usuario = usuarios[0];
          this.user = { ...this.usuario };
        } else {
          console.error('Usuario no encontrado');
          this.router.navigate(['/perfil']);
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        this.router.navigate(['/perfil']);
      }
    );
  }

  ngOnInit() {
    
  }

  updateUsuario() {
    if (!this.user.nombre || !this.user.email) {
      this.mensajeError();
      return;
    }
  
    console.log('Actualizando usuario con correo:', this.user.email);
    this.auth.putUsuario(this.user).subscribe(() => {
      // Guardar los datos actualizados en sessionStorage
      sessionStorage.setItem('id', this.user.id.toString());
      sessionStorage.setItem('nombre', this.user.nombre);
      sessionStorage.setItem('email', this.user.email);
      sessionStorage.setItem('rut', this.user.rut);
      // Guarda otros campos relevantes
      
      this.mensaje();
    }, error => {
      console.error('Error al actualizar el usuario:', error);
      this.mensajeError();
    });
  }
  

  goBack() {
    this.router.navigate(['/perfil']);
  }

  async mensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, llene todos los campos.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mensaje() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Los cambios se han guardado con éxito.',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['/perfil']);
        },
      }],
    });

    await alert.present();
  }
}
