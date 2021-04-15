import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public toastController: ToastController) {}

  ngOnInit() {}

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
