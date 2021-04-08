import { Component, OnInit } from '@angular/core';

interface Developer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
developers: Developer[];

  constructor() {}

  ngOnInit() {
    this.developers = [
      { id: 101197834, name: 'Jun Yan Gan' },
      { id: 101208175, name: 'Stefan Maric' },
      { id: 101210892, name: 'Kevin Silva' },
    ];
  }

}
