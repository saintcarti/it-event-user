import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata :any;

  usuario={
    id:0,
    email:"",
    password:"",
    passwordrepeat:"",
    isActive:false
  }

  loginForm:FormGroup;
  constructor( private authservice:AuthService,
    private router:Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private builder:FormBuilder
  ) { this.loginForm = this.builder.group({
    'email': new FormControl("", [Validators.required, Validators.email]),
    'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
  })}

  ngOnInit() {
  }

  login(){
    if (!this.loginForm.valid){
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByCorreo(email).subscribe(resp => {
    this.userdata = resp;
    console.log(this.userdata);
    if (this.userdata.length === 0) {
      this.loginForm.reset();
      this.EmailNoExiste();
      return;
    }
    this.usuario = {
      id: this.userdata[0].id,
      email: this.userdata[0].email,
      password: this.userdata[0].password,
      passwordrepeat: this.userdata[0].passwordrepeat,
      isActive: this.userdata[0].isActive
    };
    if (this.usuario.password !== password) {
      this.loginForm.reset();
      this.PasswordIncorrecto();
      return;
    }
    if (this.usuario.isActive){
      this.loginForm.reset();
      this.UsuarioInactivo();
      return;
    }
    this.iniciarSesion(this.usuario);
    });
  }
}
