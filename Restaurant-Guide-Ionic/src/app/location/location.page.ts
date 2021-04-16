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
      latitude: '43.6535419818995',
      longitude: '-79.37436111747974',
      description: 'Probably one of the best steaks I have ever eaten. Pricey...'
    },
    {
      title: 'MIKU Toronto',
      latitude: '43.64132665558467',
      longitude: '-79.37751214446476',
      description: 'The Wagyu beef is to die for, and the chefs are very personable. Teppanyaki...'
    },
    {
      title: 'Michaels On Simcoe',
      latitude: '43.64841438768175',
      longitude: '-79.38672151747988',
      description: 'Expensive but worth it, service is phenomenal. Needs a reservation...'
    }
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
        latitude: marker.latitude,
        longitude: marker.longitude,
        description: marker.description
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" style="color: #000000">' +
                              '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                              '<p>Descripton: ' + marker.description + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
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
