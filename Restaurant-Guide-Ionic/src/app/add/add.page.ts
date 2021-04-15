import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Plugins } from '@capacitor/core';

const {Storage} = Plugins;

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

  constructor(public toastController: ToastController, public nativeStorage:NativeStorage) {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.description = '';
  }

  ngOnInit() {}

  async setRestaurant(){
    const restaurant = JSON.stringify([{
      name: this.name,
      address: this.address,
      phone: this.phone,
      description: this.description
    }])
    await Storage.set({
      key: 'restaurants',
      value: restaurant
    });

  }
  async getRestaurant(){
    const restaurants = await Storage.get({key: 'restaurants'});
    console.log(JSON.parse(restaurants.value));
  }

  async getKeys(){
    const keys = await Storage.keys();
    console.log('Keys: ', keys);
  }


  async addRestaurant() {
/*
    this.nativeStorage.setItem('restaurant', {name: this.name, address: this.address, phone: this.phone, description:this.description})
      .then(
        () => console.log(this.name, this.address, this.phone,this.description),
        error => console.error('Error storing item',
        error)
    );

    this.nativeStorage.getItem('restaurant')
        .then(
          data => console.log(data),
          error => console.error(error)
        );
*/
    console.log({
      name: this.name,
      address: this.address,
      phone: this.phone,
      description: this.description,
    });

    const toast = await this.toastController.create({
      message: `${this.name} Added to Favourites`,
      duration: 2000,
      position: 'bottom',
      color: "success"
    });
    this.setRestaurant();
    this.getRestaurant();
    this.getKeys();
    toast.present();

  }
}
