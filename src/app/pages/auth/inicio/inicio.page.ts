import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  userdata: any;
  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByCorreo(email).subscribe(resp => {
      const userdata = resp;
      // Verifica si userdata es un array
      if (!Array.isArray(userdata) || userdata.length === 0) {
        this.loginForm.reset();
        this.EmailNoExiste();
        return;
      }
      const usuario = userdata[0];
      if (usuario.password !== password) {
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }
      if (usuario.isActive) {
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }
      this.iniciarSesion(usuario);
    });
  }

  private iniciarSesion(usuario: any) {
    sessionStorage.setItem('email', usuario.email);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión iniciada: ' + usuario.email);
    this.router.navigate(['/home']);
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async UsuarioInactivo() {
    const alert = await this.alertCtrl.create({
      header: 'Usuario inactivo',
      message: 'El usuario se encuentra inactivo',
      buttons: ['OK'],
    });
    alert.present();
  }

  async ErrorUsuario() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      buttons: ['OK'],
    });
    alert.present();
  }

  async EmailNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Debe registrarse',
      buttons: ['OK'],
    });
    alert.present();
  }

  registrar() {
    this.router.navigate(['/registro']);
  }
}
