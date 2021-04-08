import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('page') page: any;

  constructor(private router: Router, public toastController: ToastController) {}

  ngOnInit() {
    console.log('PAGE: ', this.page);
  }

  async logout() {
    this.router.navigate(['/']);

    let toast = await this.toastController.create({
      message: 'Logged Out',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }
}
