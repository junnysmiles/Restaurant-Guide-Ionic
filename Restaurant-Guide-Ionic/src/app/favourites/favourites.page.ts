import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddComponent } from '../add/add.page'


interface Restaurant {
  id: number;
  name: string;
  likes: number;
  address: string;
  description: string;
}
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  providers:[AddComponent]
})
export class FavouritesPage implements OnInit {

  restaurants: Restaurant[];

  constructor(private router: Router, @Inject(forwardRef(() => AddComponent)) private addComponent: AddComponent) {}

  ngOnInit() {
    this.restaurants = [
      {
        id: 1,
        name: 'Mongolian Hot Pot',
        likes: 3,
        address: 'address123',
        description: 'I love this pace, dont forget about ...',
      },

      {
        id: 2,
        name: 'Korean BBQ',
        likes: 5,
        address: 'address123',
        description: 'The Waguy beef is to die for...',
      },

      {
        id: 3,
        name: 'Sushi Teppanyaki',
        likes: 4,
        address: 'address123',
        description: 'Expensive but worth it, servers...',
      },

    ];

  }

  debug(r: any) {
    console.log(r);
  }

  counter(i: number) {
    return new Array(i);
  }

  remove(id: number) {
    this.restaurants = this.restaurants.filter((r) => r.id !== id);
  }

  navigate(r: Restaurant) {
    this.router.navigate(["/restaurant", r],)
  }
}
