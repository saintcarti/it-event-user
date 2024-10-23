import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users'; // Ajusta la ruta si es necesario


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss']
})
export class EditarPage implements OnInit {
  usuario: any;
  user = {
    id: 0,
    nombre: "",
    email: ""
  };

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController, 
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    // Recuperar datos del sessionStorage
    const nombre = sessionStorage.getItem('nombre');
    const email = sessionStorage.getItem('email');
  
    // Inicializar objeto user con datos del sessionStorage
    if (nombre) this.user.nombre = nombre;
    if (email) this.user.email = email;
  
    // Validar que el correo y el nombre no estén vacíos
    if (!this.user.nombre || !this.user.email) {
      console.error('Nombre o correo no encontrados en sessionStorage');
      this.router.navigate(['/perfil']); // Redirigir a perfil si faltan datos
      return;
    }
  
    // Cargar datos del usuario por correo
    // Cargar datos del usuario por correo
    this.auth.GetUserByCorreo(this.user.email).subscribe(
      (usuarios: Users[]) => {
        if (usuarios.length > 0) {
          this.user.id = usuarios[0].id; // Asignar ID si el usuario existe
        } else {
          console.error('Usuario no encontrado');
          this.router.navigate(['/perfil']); // Redirigir si no se encuentra el usuario
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        this.router.navigate(['/perfil']); // Redirigir en caso de error
      }
    );
    

  }
  
  

  ngOnInit() {
    // You can also handle additional initialization here if needed
  }

  updateUsuario() {
    if (!this.user.nombre || !this.user.email) {
      this.mensajeError();
      return;
    }
  
    console.log('Actualizando usuario con correo:', this.user.email);
    this.auth.putUsuario(this.user).subscribe(() => {
      this.mensaje();
    }, error => {
      console.error('Error al actualizar el usuario:', error);
      this.mensajeError(); // Mostrar mensaje de error si la actualización falla
    });
  }
  
  
  

  goBack() {
    this.navCtrl.back();
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

  async guardarCambios() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Los cambios se han guardado con éxito.',
      buttons: ['OK']
    });

    await alert.present();

    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 1000);
  }
}
