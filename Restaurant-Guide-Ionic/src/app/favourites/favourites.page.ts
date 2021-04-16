import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
})
export class FavouritesPage implements OnInit {

  restaurants: Restaurant[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.restaurants = [
      {
        id: 1,
        name: 'GEORGE Restaurant',
        likes: 5,
        address: '111C Queen Street East, Toronto, ON, M5C 1S2',
        description: 'Probably one of the best steaks I have ever eaten. Pricey...',
      },

      {
        id: 2,
        name: 'MIKU Toronto',
        likes: 4,
        address: '#105 - 10 Bay Street, Toronto, ON, M5J 2R8',
        description: 'The Wagyu beef is to die for, and the chefs are very personable. Teppanyaki...',
      },

      {
        id: 3,
        name: 'Michaels On Simcoe',
        likes: 4,
        address: 'C111 - 100 Simcoe Street, Toronto, ON, M5H 3G2',
        description: 'Expensive but worth it, service is phenomenal. Needs a reservation...',
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

  direction() {
    this.router.navigate(["/location"])
  }

  navigate(r: Restaurant) {
    this.router.navigate(["/restaurant", r],)
  }
}
