import { Component } from '@angular/core';
import { Coffee } from '../logic/Coffe';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  list: Coffee[] = [];

  constructor(private data: DataService, private router: Router,
    private geolocation: GeolocationService, private ui: UiService){
    
  }

  ngOnInit() {
    this.data.getList((list: Coffee[]) => {
      this.list  = list;
    });
    this.ui.setTitle('Coffees');
    this.ui.setThemeColor('orange');
  }

  share(coffee: Coffee) {
    const text = `I had this coffee at ${coffee.place} and for me its a ${coffee.rating} starts.`;
    const info = {
      title: coffee.name,
      text: text,
      url: window.location.href
    }

    if('share' in navigator && navigator.canShare()){
      navigator.share(info);
    } else {
      //something
    }

  }


  goDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee: Coffee){
    const mapURL = this.geolocation.getMapLinnk(coffee.location!);
    window.open(mapURL);
  }
}
