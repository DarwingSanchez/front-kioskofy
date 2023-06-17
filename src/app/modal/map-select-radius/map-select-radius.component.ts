import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MapService } from 'src/app/core/services/map/map.service';

@Component({
  selector: 'app-map-select-radius',
  templateUrl: './map-select-radius.component.html',
  styleUrls: ['./map-select-radius.component.css']
})
export class MapSelectRadiusComponent implements OnInit {
  public icon_close: any = faTimes;
  public icon_magnifying_glass: any = faMagnifyingGlass;
  public map_zoom: number = 5;
  public map_diameter_km: number = 10;
  public readonly MAP_MTS_TO_KMS: number = 1000;
  public readonly MAP_MAX_CIRCLE_RADIOUS: number = 75; // Kms
  // Default Vancouver
  public search_location: any = {
    lat: 49.241561874315174,
    lng: -123.10233834203909,
    radius: 5000,
    address: '',
  }

  constructor(private mapService: MapService, private activeModal: NgbActiveModal, private localStorageService: LocalStorageService) {}

  public async ngOnInit() {
    try {
      await this.getFilterLocation();
      this.getMapZoom();
      this.getAddreesByLatLong();
    } catch (error) {
      this.closeModal();
    }
  } 

  // Get into local storage the filter location
  public async getFilterLocation() {
    await this.localStorageService.getItem('filter_location')
      .then((resp: any) => { 
        if(resp.lat && resp.lng) {
          this.search_location = resp
          this.map_diameter_km = (resp.radius * 2) / this.MAP_MTS_TO_KMS;
        } 
      }).catch((error) => {
        throw error;
      })
  }

  // Get the address based on a lat. lng. using the google api
  public getAddreesByLatLong(): void {
    let latlng: string = this.search_location.lat.toString() + ',' + this.search_location.lng.toString();
    lastValueFrom(this.mapService.getAddreesByLatLong(latlng))
      .then((resp: any) => {
        if (resp.status === "OK" && resp.results.length > 0)
          this.search_location.address = resp.results[0].formatted_address;
      })
      .catch((error: Error) => {
        this.search_location.address = "Address not found"
        throw error;
      });
  }

  // Get the address based on a lat. lng. using the google api
  public getLatLongByAddress(): void {
    lastValueFrom(this.mapService.getLatLongByAddrees(this.search_location.address))
      .then((resp: any) => {
        if (resp.status === "OK" && resp.results.length > 0) {
          this.search_location.lat = resp.results[0].geometry.location.lat;
          this.search_location.lng = resp.results[0].geometry.location.lng;
        }
      })
      .catch((error: Error) => {
        this.search_location.address = "Address not found"
        throw error;
      });
  }

  // Get zoom in order to make sure the circle fits the map
  public getMapZoom(): void {
    let map_length: number = 640000; // Inicia con este valor en metros en el mapa, +1 zoom divide el length entre 2
    for (let index = 5; index < 14; index++) {
      if(((this.search_location.radius * 2) - 600) >= map_length) return
      else map_length = map_length/2;
      this.map_zoom = index;
    }
  }

  // Change pickup locations for the product
  public changeLocation(lat: number, lng: number): void {
    this.search_location.lat = lat;
    this.search_location.lng = lng;
    this.getAddreesByLatLong();
  }

  // Get the event from the slider and transform it into the radius for the map
  public readInputSlider(event: Event): void {
    let radius: number = Number((event.target as HTMLTextAreaElement).value) * this.MAP_MTS_TO_KMS;
    this.changeRadius(radius);
  }

  // Updates the value of the searchs radius
  public changeRadius(radius: any): void {
    this.search_location.radius = radius;
    this.getMapZoom();
  }

  // Updates the value of the searchs radius
  public transformRadiusToKm(): string {
    return (this.search_location.radius / 500).toFixed(1);
  }

  // Save into local storage the filter location
  public async saveFilterLocation() {
    await this.localStorageService.setItem('filter_location', this.search_location);
    this.updateObservableFilterLocation();
    this.closeModal();
  }

  // Update the filter location observable to keep track in other components
  private updateObservableFilterLocation(): void {
    this.localStorageService.filter_location$.subscribe((data: any) => { data = this.search_location });
  }

  // Close this modal
  public closeModal(): void {
    this.activeModal.close();
  }
}
