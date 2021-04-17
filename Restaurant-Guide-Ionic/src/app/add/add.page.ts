import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Plugins } from '@capacitor/core';

const {Storage} = Plugins;

class Restaurant {
  id: string;
  type: string;
  name: string;
  phone: string;
  address: string;
  description: string;

  constructor(name, address, phone, description) {
    this.id = `${Date.now()}`;
    this.type = "restaurant";
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.description = description;
  }
}

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

  restaurants = [];

  constructor(public toastController: ToastController, public nativeStorage:NativeStorage) {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.description = '';
  }

  ngOnInit() {}

  async addRestaurant(e: any) {
    const restaurant = new Restaurant(
      this.name,
      this.address,
      this.phone,
      this.description
    );
    this.setObject(JSON.stringify(restaurant.id), restaurant);
    this.readData();

    let msg = ''
    let allInputFields = false;

    if (this.name ==='' || this.address ==='' || this.phone === '' || this.description === '') {
      msg = 'Please enter all fields to add to favourites.';
    }
    else {
      msg = `${this.name} Successfully Added to Favourites.`;
      allInputFields = true;
    }

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: allInputFields ? "success" : "danger",
    });
    toast.present();
  }

  async deleteData() {
    await Storage.clear();
    this.readData();
  }

  debug() {
    console.log('!!', this.restaurants);
  }

  async setObject(key: string, value: any): Promise<any> {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async readData(): Promise<any> {
    this.restaurants = [];
    const { keys } = await Storage.keys();
    keys.forEach(this.getData, this);
  }

  async getData( key: string): Promise<any> {
    const item = await Storage.get({ key });
    // to debug possibly
    // console.log(key, item);
    const r = JSON.parse(item.value);
    this.restaurants.push(r);
  }

}
