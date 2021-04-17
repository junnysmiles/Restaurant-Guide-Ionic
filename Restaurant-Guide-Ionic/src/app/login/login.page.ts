import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, public toastController: ToastController) {
    this.email = '';
    this.password = '';
   }

  ngOnInit() {}

  async navigate() {
    let msg = '';
    let isLoggedIn = false;

    if (this.email === '' || this.password === '') {
      msg = 'Login Failed.';
    }
    else {
      msg = 'Welcome Back!';
      isLoggedIn = true;
    }

    let toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: isLoggedIn ? "success" : "danger",
    });

    toast.present();

    if(isLoggedIn) {
      this.router.navigate(['/tabs/favourites']);
    }
  }

  signup(){
    this.router.navigate(['/signup']);
  }
}
