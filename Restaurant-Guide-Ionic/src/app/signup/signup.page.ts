import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private router: Router, public toastController: ToastController) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  async navigate() {
    let msg = '';
    let isSignedUp = false;

    if (this.firstName ==='' || this.lastName ==='' || this.email === '' || this.password === '') {
      msg = 'Please enter all fields to sign-up';
    }
    else {
      msg = 'Thank you for signing up!';
      isSignedUp = true;
    }

    let toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: isSignedUp ? "success" : "danger",
    });

    toast.present();

    if(isSignedUp) {
      this.router.navigate(['/tabs/favourites']);
    }
  }

  login() {
    this.router.navigate(['']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
