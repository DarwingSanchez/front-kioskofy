import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MapService } from 'src/app/core/services/map/map.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.css']
})
export class MapLocationComponent implements OnInit {
  public address: string = '';
  public faTrash = faTrash;
  public faTimes = faTimes;
  public is_main_location: boolean = false;
  public toogle = new FormControl('', []);
  @Input() lat!: number; 
  @Input() lng!: number;
  @Input() index!: number;
  @Input() callbackDeleteLocation = (lat: number, lng: number) => {};
  @Input() callbackSelectMainLocation = (lat: number, lng: number, is_main_location: boolean) => {};
  
  constructor(private mapService: MapService, private activeModal: NgbActiveModal) {}
  
  async ngOnInit() {
    try {
      await this.getAddress();
      this.toggleMainLocation();
    } catch (error) {
      throw error;
    }
  }

  // Get the address based on a lat. lng. using the google api
  public getAddress() {
    console.log(this.lat,
this.lng);
    
    let latlng: string = this.lat.toString() + ',' + this.lng.toString();
    lastValueFrom(this.mapService.getAddreesByLatLong(latlng))
      .then((resp: any) => {
        if (resp.status === "OK" && resp.results.length > 0)
          this.address = resp.results[0].formatted_address;
      })
      .catch((error: Error) => {
        this.address = "Address not found"
        throw error;
      });
  }

  // Ger main location information and toggle
  public toggleMainLocation() {
    this.is_main_location = this.index === 0;
      this.toogle.valueChanges.subscribe((newToogleValue: any) => {
      this.is_main_location = newToogleValue;
   });
  }

  // Delete location from main array of locations in parent component
  public deleteLocation(): void {
    this.callbackDeleteLocation(this.lat, this.lng);
    this.activeModal.close();
  }

  // Close this modal
  public closeModal(): void {
    this.callbackSelectMainLocation(this.lat, this.lng, this.is_main_location);
    this.activeModal.close();
  }
}
