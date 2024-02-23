import { Component } from '@angular/core';
import { Coffee } from '../logic/Coffe';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-coffe',
  templateUrl: './coffe.component.html',
  styleUrl: './coffe.component.css'
})
export class CoffeComponent {

  constructor(private geoLocation: GeolocationService, private data: DataService, private router: Router, private route: ActivatedRoute,
              private ui: UiService){}

  coffee = new Coffee();
  types = ['expresso', 'Ristreto', 'Americano', 'Cappuccino', 'Frappe']
  tastingEnabled = false;
  formType: 'editing' | 'inserting' = 'inserting';


  ngOnInit() {
    this.ui.setThemeColor("brown");
    this.ui.setTitle("new");
    this.route.params.subscribe(params => {
      if(params["id"]) {
        this.data.get(params['id'], (response: any) => {
          this.coffee = response;
          this.formType = 'editing';
          this.ui.setTitle(this.coffee.name);
          if(this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
        })
      }
    });
  }

  cancel(){
    this.router.navigate(['/']);
  }
  save() {
    let resultFunction = (result: boolean) => {
      if(result) {
        this.router.navigate(['/']);
      }
      else {

      }
    };
      
    if(this.formType === 'inserting') {
      let {_id, ...insertedCoffee} = this.coffee;
      this.data.save(insertedCoffee, resultFunction);
    } else {
      this.data.save(this.coffee, resultFunction);
    }

  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  acquireLocation() {
    this.geoLocation.requestLocation((location: GeolocationCoordinates | null ) => {
      if (location) {
       this.coffee.location!.latitude = location.latitude;
        this.coffee.location!.longitude = location.longitude;
      }
    });
  }
}
