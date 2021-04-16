import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: 'GEORGE Restaurant',
      address: '111C Queen Street East, Toronto, ON, M5C 1S2',
      likes: 5,
      latitude: '43.6535419818995',
      longitude: '-79.37436111747974',
      description: 'Probably one of the best steaks I have ever eaten. Pricey...'
    },
    {
      title: 'MIKU Toronto',
      address: '#105 - 10 Bay Street, Toronto, ON, M5J 2R8',
      likes: 4,
      latitude: '43.64132665558467',
      longitude: '-79.37751214446476',
      description: 'The Wagyu beef is to die for, and the chefs are very personable. Teppanyaki...'
    },
    {
      title: 'Michaels On Simcoe',
      address: 'C111 - 100 Simcoe Street, Toronto, ON, M5H 3G2',
      likes: 4,
      latitude: '43.64839886114707',
      longitude: '-79.38670005980809',
      description: 'Expensive but worth it, service is phenomenal. Needs a reservation...'
    },
    {
      title: 'Chotto Matte Toronto',
      address: '161 Bay Street, Toronto, ON, M5J 2S1',
      likes: 4,
      latitude: '43.646555603571876',
      longitude: '-79.37859774446454',
      description: 'Yet another amazing sushi place, it is new and the interior is absolutely...'
    },
    {
      title: 'King Taps',
      address: '100 King Street West, Toronto, ON M5X 1E1',
      likes: 3,
      latitude: '43.64878258812655',
      longitude: '-79.3817449278364',
      description: 'Food is good, but service is not as great. Too many people...'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        address: marker.address,
        likes: marker.likes,
        latitude: marker.latitude,
        longitude: marker.longitude,
        description: marker.description
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" style="color: #000000">' +
                              '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
                              '<p><b>Address: </b>' + marker.address + '</p>' +
                              '<div><ion-icon name="heart-circle-outline">' + marker.likes + '</ion-icon></div>' +
                              '<p><b>Descripton: </b>' + marker.description + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clickedQ');
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(43.64792537252504, -79.38766472271254);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}
