import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name: string;
  address: string;
  phone: string;
  description: string;

  constructor(public toastController: ToastController) {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.description = '';
  }

  ngOnInit() {}

  async addRestaurant() {
    console.log({
      name: this.name,
      address: this.address,
      phone: this.phone,
      description: this.description,
    });

    const toast = await this.toastController.create({
      message: `${this.name} added to the Database`,
      duration: 2000,
      position: 'bottom',
      color: "success"
    });

    toast.present();
  }
}
