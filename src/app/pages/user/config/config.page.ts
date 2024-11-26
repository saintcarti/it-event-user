import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  isDarkMode:boolean;

  constructor(private platForm:Platform,private router:Router) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = prefersDark;
      document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    
  }

  ngOnInit() {

   
  }
  backButton(){
    this.router.navigate(['/tabs/tab1']);
  }

  toggleTheme(event: any) {
    this.isDarkMode = event.detail.checked;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

}
